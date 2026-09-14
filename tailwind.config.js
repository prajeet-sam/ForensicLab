/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0b0408',
          900: '#170a11',
          800: '#22101a',
          700: '#2f1625',
          600: '#3d1c32',
          500: '#4e2642',
        },
        lab: {
          50: '#fdf2fb',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
        },
        crimson: {
          400: '#fb7185',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
        },
        cyan: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          300: '#f9a8d4',
        },
        amber: {
          200: '#ffd9ce',
          300: '#ffb9a8',
          400: '#ff9e87',
          500: '#ff7f66',
        },
        emerald: {
          200: '#fbd0ea',
          300: '#f9a3d8',
          400: '#ff5ec2',
          500: '#f542a5',
          600: '#d6278a',
        },
        evidence: {
          tag: '#3b5998',
          label: '#e8e6e1',
        },
      },
      spacing: {
        4.5: '1.125rem',
      },
      fontFamily: {
        sans: [
          'system-ui', '-apple-system', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
        ],
        mono: [
          'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas',
          'Liberation Mono', 'Courier New', 'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236,72,153,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(236,72,153,0.4)' },
        },
      },
    },
  },
  plugins: [],
}
