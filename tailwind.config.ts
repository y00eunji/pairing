import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        sans: ['Graphik', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
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
  plugins: [],
} satisfies Config;
