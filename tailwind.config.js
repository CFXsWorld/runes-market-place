/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#AD8D65',
          '.modal-box': {
            background: 'var(--cfxs-bg-e-secondary)',
          },
        },
      },
    ],
  },
  theme: {
    screens: {
      sm: '480px',
      md: '960px',
    },
    extend: {
      colors: {
        theme: {
          DEFAULT: 'var(--cfxs-theme)',
          'non-opaque': 'var(--cfxs-theme-non-opaque)',
        },
        tc: {
          DEFAULT: 'var(--cfxs-color-theme)',
          primary: 'var(--cfxs-tc-primary)',
          secondary: 'var(--cfxs-tc-secondary)',
          tertiary: 'var( --cfxs-tc-tertiary)',
          'on-button': 'var(--cfxs-tc-on-button)',
        },
        fill: {
          DEFAULT: 'var(--cfxs-theme)',
          primary: 'var(--cfxs-bg-primary)',
          'e-primary': 'var(--cfxs-bg-e-primary)',
          secondary: 'var(--cfxs-bg-secondary)',
          'e-secondary': 'var(--cfxs-bg-e-secondary)',
          toast: 'var(--cfxs-toast)',
          separator: 'var(--cfxs-separator-opaque)',
          'non-separator': 'var(--cfxs-separator-non-opaque)',
          component: 'var(--cfxs-fill-primary)',
        },
        status: {
          info: 'var(--cfxs-color-info)',
          error: 'var(--cfxs-color-error)',
          warning: 'var(--cfxs-color-warning)',
          success: 'var(--cfxs-color-success)',
          'info-non-opaque': 'var(--cfxs-color-info-non-opaque)',
          'warning-non-opaque': 'var(--cfxs-color-warning-non-opaque)',
          'error-non-opaque': 'var(--cfxs-color-error-non-opaque)',
        },
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: { transform: 'rotate(360deg)' },
        },
        wave: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        wave: 'wave 2s ease-in-out infinite;',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-animate'),
    require('@tailwindcss/line-clamp'),
  ],
};
