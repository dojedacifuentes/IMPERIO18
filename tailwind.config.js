/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        imperio: {
          950: '#04060D',
          900: '#080D1A',
          850: '#0C1424',
          800: '#111C31',
          700: '#1A2942',
          600: '#26395C',
          500: '#33507F',
        },
        gold: {
          300: '#FFE27A',
          400: '#FFD24A',
          500: '#F5B915',
          600: '#D19A0B',
          700: '#A67A08',
        },
        royal: {
          400: '#4F8DF7',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1739A8',
        },
        silver: {
          100: '#F2F5FA',
          200: '#DCE3EE',
          300: '#B9C4D6',
          400: '#8E9CB4',
          500: '#6B7A93',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        danger: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
        whatsapp: {
          400: '#4BE383',
          500: '#25D366',
          600: '#1EBE5A',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.75)',
        gold: '0 8px 24px -10px rgba(245, 185, 21, 0.55)',
        green: '0 10px 26px -10px rgba(37, 211, 102, 0.55)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '60%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
        shine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.28s ease-out both',
        pop: 'pop 0.22s ease-out both',
        shine: 'shine 3s linear infinite',
      },
    },
  },
  plugins: [],
};
