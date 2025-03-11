import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'degular': ['"degular-variable"', 'sans-serif'],
        'degular-display': ['"degular-display"', 'sans-serif'],
        'degular-text': ['"degular-text"', 'sans-serif'],
      },
    },
  },
} as Config 