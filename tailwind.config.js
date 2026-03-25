/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#131313',
        surface: '#131313',
        'surface-dim': '#131313',
        'surface-lowest': '#0e0e0e',
        'surface-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-high': '#2a2a2a',
        'surface-highest': '#353534',
        outline: '#849396',
        'outline-variant': '#3b494c',
        primary: '#c3f5ff',
        'primary-strong': '#00e5ff',
        secondary: '#cdbdff',
        danger: '#ffb4ab',
        'on-surface': '#e5e2e1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        label: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
      },
      boxShadow: {
        ambient: '0 20px 40px rgba(0, 0, 0, 0.4)',
        cyan: '0 0 20px rgba(195, 245, 255, 0.15)',
      },
      backdropBlur: {
        executive: '24px',
      },
    },
  },
  plugins: [],
}
