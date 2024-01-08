import { Conflux } from 'js-conflux-sdk';
import { ChainNotConfiguredError, createConnector, normalizeChainId } from '@wagmi/core';
import { ResourceUnavailableRpcError, SwitchChainError, UserRejectedRequestError, getAddress, numberToHex } from 'viem';

export function fluentWallet(parameters) {
  let sdk;
  let walletProvider;
  return createConnector((config) => ({
    id: 'Conflux',
    name: 'fluent',
    type: fluentWallet.type,
    async getProvider() {
      if (!walletProvider) {
        if (!sdk || !sdk?.isInitialized()) {
          sdk = new Conflux({
            enableDebug: false,
            dappMetadata: { name: 'wagmi' },
            extensionOnly: true,
            modals: {
              otp() {
                const noop = () => {};
                return { mount: noop, unmount: noop };
              },
            },
            useDeeplink: true,
            _source: 'wagmi',
            ...parameters,
            checkInstallationImmediately: false,
            checkInstallationOnAllCalls: false,
          });
          await sdk.init();
        }
        try {
          walletProvider = sdk.getProvider();
          console.log('fluent:', walletProvider);
        } catch (error) {
          const regex = /^SDK state invalid -- undefined( mobile)? provider$/;
          if (!regex.test(error.message)) throw error;
        }
      }
      return walletProvider;
    },
    async getAccounts() {
      const provider = await this.getProvider();
      const accounts = await provider.request({
        method: 'eth_accounts',
      });
      console.log('accounts', accounts);
      return accounts.map(getAddress);
    },

    async setup() {
      const provider = await this.getProvider();
      if (provider) provider.on('connect', this.onConnect.bind(this));
    },

    async connect({ chainId, isReconnecting } = {}) {
      const provider = await this.getProvider();
      let accounts = null;
      if (!isReconnecting) {
        accounts = await this.getAccounts().catch(() => null);
        const isAuthorized = !!accounts?.length;
        if (isAuthorized)
          try {
            const permissions = await provider.request({
              method: 'wallet_requestPermissions',
              params: [{ eth_accounts: {} }],
            });
            accounts = permissions[0]?.caveats?.[0]?.value?.map(getAddress);
          } catch (err) {
            const error = err;
            if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
            if (error.code === ResourceUnavailableRpcError.code) throw error;
          }
      }

      try {
        if (!accounts?.length) {
          const requestedAccounts = await sdk.connect();
          accounts = requestedAccounts.map(getAddress);
        }

        provider.removeListener('connect', this.onConnect.bind(this));
        provider.on('accountsChanged', this.onAccountsChanged.bind(this));
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect.bind(this));

        if (!sdk.isExtensionActive() && !sdk._getConnection()?.isAuthorized()) {
          function waitForAuthorized() {
            return new Promise((resolve) => {
              const connection = sdk._getConnection();
              const connector = connection?.getConnector();
              connector?.once('authorized', () => resolve(true));
            });
          }
          await waitForAuthorized();
        }
        let currentChainId = await this.getChainId();
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error;
            return { id: currentChainId };
          });
          currentChainId = chain?.id ?? currentChainId;
        }

        await config.storage?.removeItem('Conflux.disconnected');

        return { accounts, chainId: currentChainId };
      } catch (err) {
        const error = err;
        if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
        if (error.code === ResourceUnavailableRpcError.code) throw new ResourceUnavailableRpcError(error);
        throw error;
      }
    },

    async disconnect() {
      const provider = await this.getProvider();

      provider.removeListener('accountsChanged', this.onAccountsChanged.bind(this));
      provider.removeListener('chainChanged', this.onChainChanged);
      provider.removeListener('disconnect', this.onDisconnect.bind(this));
      provider.on('connect', this.onConnect.bind(this));

      sdk.terminate();

      // Add shim signalling connector is disconnected
      await config.storage?.setItem('Conflux.disconnected', true);
    },

    async getChainId() {
      const provider = await this.getProvider();
      const chainId = provider.chainId ?? (await provider?.request({ method: 'eth_chainId' }));
      return normalizeChainId(chainId);
    },

    async isAuthorized() {
      try {
        const isDisconnected =
          // If shim exists in storage, connector is disconnected
          await config.storage?.getItem('Conflux.disconnected');
        if (isDisconnected) return false;

        const accounts = await this.getAccounts();
        return !!accounts.length;
      } catch {
        return false;
      }
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider();

      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      try {
        await Promise.all([
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: numberToHex(chainId) }],
          }),
          new Promise((resolve) =>
            config.emitter.once('change', ({ chainId: currentChainId }) => {
              if (currentChainId === chainId) resolve();
            })
          ),
        ]);
        return chain;
      } catch (err) {
        const error = err;

        // Indicates chain is not added to provider
        if (
          error.code === 4902 ||
          // Unwrapping for MetaMask Mobile
          // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
          error?.data?.originalError?.code === 4902
        ) {
          try {
            const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
            let blockExplorerUrls = [];
            if (blockExplorer) blockExplorerUrls = [blockExplorer.url, ...Object.values(blockExplorers).map((x) => x.url)];

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: numberToHex(chainId),
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpcUrls.default?.http[0] ?? ''],
                  blockExplorerUrls,
                },
              ],
            });

            const currentChainId = await this.getChainId();
            if (currentChainId !== chainId) throw new UserRejectedRequestError(new Error('User rejected switch after adding network.'));

            return chain;
          } catch (error) {
            throw new UserRejectedRequestError(error);
          }
        }

        if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
        throw new SwitchChainError(error);
      }
    },
    async onAccountsChanged(accounts) {
      // Disconnect if there are no accounts
      if (accounts.length === 0) this.onDisconnect();
      // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
      else if (config.emitter.listenerCount('connect')) {
        const chainId = (await this.getChainId()).toString();
        this.onConnect({ chainId });
        await config.storage?.removeItem('Conflux.disconnected');
      }
      // Regular change event
      else config.emitter.emit('change', { accounts: accounts.map(getAddress) });
    },
    onChainChanged(chain) {
      const chainId = normalizeChainId(chain);
      config.emitter.emit('change', { chainId });
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts();
      if (accounts.length === 0) return;

      const chainId = normalizeChainId(connectInfo.chainId);
      config.emitter.emit('connect', { accounts, chainId });

      const provider = await this.getProvider();
      if (provider) {
        provider.removeListener('connect', this.onConnect.bind(this));
        provider.on('accountsChanged', this.onAccountsChanged.bind(this));
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect.bind(this));
      }
    },
    async onDisconnect(error) {
      const provider = await this.getProvider();
      if (error && error.code === 1013) {
        if (provider && !!(await this.getAccounts()).length) return;
      }
      config.emitter.emit('disconnect');

      provider.removeListener('accountsChanged', this.onAccountsChanged.bind(this));
      provider.removeListener('chainChanged', this.onChainChanged);
      provider.removeListener('disconnect', this.onDisconnect.bind(this));
      provider.on('connect', this.onConnect.bind(this));
    },
  }));
}
