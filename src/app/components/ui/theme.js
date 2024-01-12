export default {
  button: {
    base: 'outline-none border border-transparent flex-center',
    color: {
      primary:
        'bg-theme text-black hover:opacity-95 focus:outline-none h-[48px] ',
      outline: 'broder border-theme rounded-[4px] hover:bg-theme h-[48px] text-theme hover:text-black',
      secondary:
        'text-theme bg-fill-e-secondary focus:outline-none  hover:opacity-95 h-[48px]',
      outlineGray:
        'broder bg-transparent border-fill-separator text-tc-secondary h-[48px]',
    },
    pill: {
      off: 'rounded-[4px]',
    },
    "size": {
      "xs": "text-xs px-2 py-1",
      "sm": "text-sm px-3 py-1.5",
      "md": "text-sm px-3 py-2",
      "lg": "text-base px-5 py-2.5",
      "xl": "text-base px-6 py-3"
    }
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
    body: {
      base: 'p-0 flex-1 overflow-auto',
      popup: 'pt-0',
    },
    content: {
      base: 'relative w-full  p-4 md:h-auto max-md:h-auto',
      inner:
        'relative rounded-[4px] bg-fill-e-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]',
    },
    header: {
      base: 'flex items-start justify-between rounded-t dark:border-gray-600  p-5',
      title: 'text-white text-[20px] max-md:text-[18px] font-[500]',
      close: {
        base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-fill-e-primary hover:text-black-900 dark:hover:bg-black-600 dark:hover:text-white',
        icon: 'h-5 w-5',
      },
    },
  },
  dropdown: {
    arrowIcon: 'ml-2 h-4 w-4',
    content: 'py-1 focus:outline-none',
    floating: {
      animation: 'transition-opacity',
      arrow: {
        base: 'absolute z-10 h-2 w-2 rotate-45',
        style: {
          dark: 'bg-gray-900 dark:bg-gray-700',
          light: 'bg-white',
          auto: 'bg-white dark:bg-gray-700',
        },
        placement: '-4px',
      },
      base: 'z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none',
      content: 'py-1 text-sm text-gray-700 dark:text-gray-200 ',
      divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
      header: 'block py-2 px-4 text-sm text-gray-700 dark:text-gray-200',
      hidden: 'invisible opacity-0',
      item: {
        container: '',
        base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
        icon: 'mr-2 h-4 w-4',
      },
      style: {
        dark: 'bg-gray-900 text-white dark:bg-gray-700 ',
        light: 'border border-gray-200 bg-white text-gray-900 ',
        auto: 'border border-fill-separator rounded-[4px] bg-fill-e-secondary',
      },
      target: 'w-fit  w-full',
    },
    inlineWrapper: 'flex items-center',
  },
  progress: {
    "base": "w-full overflow-hidden rounded-full bg-fill-e-secondary",
    color: {
      primary: 'bg-theme',
    },
  },
};
