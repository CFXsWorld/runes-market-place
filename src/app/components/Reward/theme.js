export default {
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
        '2xl': 'max-w-[490px]',
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
      base: 'relative p-4 md:h-auto max-md:h-auto',
      inner:
        'relative rounded-[4px]  shadow dark:bg-gray-700 flex flex-col max-h-[90vh] outline-none',
    },
  },
};
