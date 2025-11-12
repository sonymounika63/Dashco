/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        success: {
          50: '#ecfdf3',
          500: 'rgb(16 185 129 / <alpha-value>)',
          600: '#039855',
        },
        error: {
          50: '#fef2f2',
          500: 'rgb(239 68 68 / <alpha-value>)',
          600: '#dc2626',
        },
        orange: {
          50: '#fff7ed',
          500: 'rgb(249 115 22 / <alpha-value>)',
          600: '#ea580c',
        },
        blue: {
          50: '#eff6ff',
          500: 'rgb(59 130 246 / <alpha-value>)',
          600: '#2563eb',
        },
        // TailAdmin dark mode colors
        'dark-bg': {
          primary: '#101828', // Main background
          secondary: '#161E2E', // Input/Secondary background (rgb(22, 30, 46))
        },
      },
      fontSize: {
        'theme-xs': ['12px', '18px'], // fontSize: 12px, lineHeight: 18px (matches TailAdmin)
      },
    },
  },
  plugins: [],
}
