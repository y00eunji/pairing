import plugin from 'tailwindcss/plugin';

import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		screens: {
  			sm: '375px'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			mainPink1: '#FF4F75',
  			mainPink2: '#FF85A2',
  			black: '#262626',
  			gray1: '#909090',
  			gray2: '#D9D9D9',
  			gray3: '#EFEFEF',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			noto: [
  				'var(--font-noto)',
  				'sans-serif'
  			],
  			roboto: [
  				'var(--font-roboto)',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontSize: {
  		'26px': '26px',
  		'24px': '24px',
  		'22px': '22px',
  		'20px': '20px',
  		'18px': '18px',
  		'14px': '14px',
  		'12px': '12px'
  	},
  	fontWeight: {
  		regular: '400',
  		medium: '500',
  		bold: '700',
  		semiBold: '600'
  	}
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
      require("tailwindcss-animate")
],
} satisfies Config;
