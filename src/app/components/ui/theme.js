export default {
  button: {
    base: 'outline-none border border-transparent  ',
    color: {
      primary:
        'bg-theme text-black hover:opacity-95 focus:outline-none h-[48px] ',
      outline: 'broder border-theme rounded-[4px] hover:bg-theme h-[48px]',
      secondary:
        'text-theme bg-fill-e-secondary focus:outline-none  hover:opacity-95 h-[48px]',
    },
    pill: {
      off: 'rounded-[4px]',
    },
  },
  modal: {
    root: {
      base: 'fixed top-0 right-0 left-0 z-[1000] h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-black bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden',
      },
      sizes: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-[480px]',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
    },
    "body": {
      "base": "p-0 flex-1 overflow-auto",
      "popup": "pt-0"
    },
    content: {
      base: 'relative w-full  p-0 md:h-auto max-md:h-auto',
      inner:
        'relative rounded-lg bg-fill-e-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
    },
    header: {
      "base": "flex items-start justify-between rounded-t dark:border-gray-600  p-5",
      title: 'text-white text-[20px] max-md:text-[18px] font-[500]',
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-fill-e-primary hover:text-black-900 dark:hover:bg-black-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
  },
};
