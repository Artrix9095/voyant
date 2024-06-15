import { fontFamily } from 'tailwindcss/defaultTheme';
import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        'spring-dark': {
          extend: 'dark',
          colors: {
            background: '#09090d',
            foreground: '#fff',
            primary: {
              50: '#eefff5',
              100: '#d7ffea',
              200: '#b2ffd6',
              300: '#59ffa9',
              400: '#33f591',
              500: '#09de71',
              600: '#01b85a',
              700: '#05904a',
              800: '#0a713d',
              900: '#0a5d35',
              950: '#00341b',
              // biome-ignore lint/style/useNamingConvention: <explanation>
              DEFAULT: '#59ffa9',
              foreground: '#09090d',
            },
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};
