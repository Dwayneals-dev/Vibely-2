/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#06060A',
          900: '#09090F',
          800: '#111118',
          700: '#1A1A24',
          600: '#242430',
        },
        accent: {
          pink: '#E855A0',
          orange: '#FB923C',
          violet: '#8B5CF6',
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
