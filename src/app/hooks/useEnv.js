const useEnv = () => {
  return {
    wgamiProjectId: process.env.CFXS_WALLETCONNECT_PROJECT_ID,
    isTest: process.env.NEXT_PUBLIC_IsTest,
    correctChainId: process.env.NEXT_PUBLIC_CorrectChainId,
    correctChainIdHex: process.env.NEXT_PUBLIC_CorrectChainIdHex,
    eSpaceRPC: process.env.NEXT_PUBLIC_ESpaceRpc,
    oldContractAddress: process.env.NEXT_PUBLIC_OldContractAddress,
    newContractAddress: process.env.NEXT_PUBLIC_NewContractAddress,
    bridgeContractAddress: process.env.NEXT_PUBLIC_BridgeContractAddress,
    multiCallContractAddress: process.env.NEXT_PUBLIC_MultiCallContractAddress,
    USDTContractAddress: process.env.NEXT_PUBLIC_USDTContractAddress,
    eSpaceExplor: process.env.NEXT_PUBLIC_ESpaceExplor,

  };
};

export default useEnv;
