/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
      maxWidth: {
        luxe: '1280px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 1px)',
        sm: 'calc(var(--radius) - 2px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        onyx: '#080808',
        gold: '#C5A059',
        champagne: '#E6C280',
        mutedGold: '#8A733E',
        velvet: '#0B1B15',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      letterSpacing: {
        luxe: '0.2em',
        luxe2: '0.14em',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'grow-line': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' }
        },
        'grow-line-y': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' }
        },
        'pulse-amber': {
          '0%,100%': { boxShadow: '0 0 0 rgba(197,160,89,0)' },
          '50%': { boxShadow: '0 0 28px rgba(197,160,89,0.35)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease-out forwards',
        'fade-in': 'fade-in 1.2s ease-out forwards',
        'grow-line': 'grow-line 1.1s ease-out forwards',
        'grow-line-y': 'grow-line-y 1.4s ease-out forwards',
        'pulse-amber': 'pulse-amber 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
