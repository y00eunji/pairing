import plugin from 'tailwindcss/plugin';

import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '375px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        mainPink1: '#FF4F75',
        mainPink2: '#FF85A2',
        black: '#262626',
        gray1: '#909090',
        gray2: '#D9D9D9',
        gray3: '#EFEFEF',
      },
      fontFamily: {
        noto: ['var(--font-noto)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
    },
    fontSize: {
      '26px': '26px',
      '24px': '24px',
      '22px': '22px',
      '20px': '20px',
      '18px': '18px',
      '14px': '14px',
      '12px': '12px',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
      semiBold: '600',
    },
  },
  plugins: [
    plugin(({ addUtilities, e }) => {
      addUtilities({
        [`.here`]: {
          animation: `wobble 0.5s ease-in-out alternate infinite`,
        },
        [`@keyframes wobble`]: {
          '0%': {
            'box-shadow':
              'inset 4px 4px rgb(144, 238, 144), inset -4px -4px rgb(144, 238, 144)',
          },
          '100%': {
            'box-shadow':
              'inset 8px 8px rgb(144, 238, 144), inset -8px -8px rgb(144, 238, 144)',
          },
        },
      });
    }),
  ],
} satisfies Config;
