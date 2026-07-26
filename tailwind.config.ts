import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-public-sans)',
          'sans-serif'
        ],
        mono: [
          'var(--font-geist-mono)',
          'monospace'
        ],
        serif: [
          'var(--font-playfair)',
          'serif'
        ],
        /* New landing (v2) display face */
        display: [
          'var(--font-sora)',
          'sans-serif'
        ]
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        /* Broker directory (/directory) amber palette - scoped tokens */
        paper: 'hsl(var(--paper) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        ink: 'hsl(var(--ink) / <alpha-value>)',
        dmuted: 'hsl(var(--dmuted) / <alpha-value>)',
        faint: 'hsl(var(--faint) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
        'line-strong': 'hsl(var(--line-strong) / <alpha-value>)',
        brand: 'hsl(var(--brand) / <alpha-value>)',
        'brand-strong': 'hsl(var(--brand-strong) / <alpha-value>)',
        'brand-ink': 'hsl(var(--brand-ink) / <alpha-value>)',
        'brand-soft': 'hsl(var(--brand-soft) / <alpha-value>)',
        'on-brand': 'hsl(var(--on-brand) / <alpha-value>)',
        dmark: 'hsl(var(--dmark) / <alpha-value>)',
        good: 'hsl(var(--good) / <alpha-value>)',
        'good-soft': 'hsl(var(--good-soft) / <alpha-value>)',
        /* New landing (v2) palette - static tokens, dark navy + gold + light paper */
        'v2-navy': '#0B1522',
        'v2-navy-2': '#0E1B2C',
        'v2-navy-3': '#16273D',
        'v2-ink': '#0B1420',
        'v2-paper': '#E9E9EA',
        'v2-paper-2': '#F5F5F6',
        'v2-gold': '#E8B662',
        'v2-gold-2': '#D9A24B',
        'v2-mist': '#D7E3F4',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
