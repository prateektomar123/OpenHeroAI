/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        hero: {
          // Dark theme optimized hero colors
          batman: {
            primary: '#2a2a2a',
            secondary: '#1a1a1a',
            accent: '#374151',
            glow: '#4b5563',
          },
          spiderman: {
            primary: '#dc2626',
            secondary: '#b91c1c',
            accent: '#ef4444',
            glow: '#f87171',
          },
          superman: {
            primary: '#1d4ed8',
            secondary: '#1e40af',
            accent: '#3b82f6',
            glow: '#60a5fa',
          },
          ironman: {
            primary: '#ea580c',
            secondary: '#c2410c',
            accent: '#f97316',
            glow: '#fb923c',
          },
          captain: {
            primary: '#166534',
            secondary: '#14532d',
            accent: '#22c55e',
            glow: '#4ade80',
          },
          wonderwoman: {
            primary: '#7c2d12',
            secondary: '#9a3412',
            accent: '#dc2626',
            glow: '#f87171',
          },
          flash: {
            primary: '#dc2626',
            secondary: '#b91c1c',
            accent: '#f59e0b',
            glow: '#fbbf24',
          },
          hulk: {
            primary: '#166534',
            secondary: '#14532d',
            accent: '#22c55e',
            glow: '#4ade80',
          },
          thor: {
            primary: '#1e40af',
            secondary: '#1e3a8a',
            accent: '#3b82f6',
            glow: '#60a5fa',
          },
          blackwidow: {
            primary: '#7c2d12',
            secondary: '#9a3412',
            accent: '#dc2626',
            glow: '#f87171',
          },
          deadpool: {
            primary: '#dc2626',
            secondary: '#b91c1c',
            accent: '#f59e0b',
            glow: '#fbbf24',
          },
          wolverine: {
            primary: '#374151',
            secondary: '#1f2937',
            accent: '#6b7280',
            glow: '#9ca3af',
          },
        }
      },
      fontFamily: {
        'hero': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
