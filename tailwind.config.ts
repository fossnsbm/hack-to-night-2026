import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        grid: 'rgba(0, 229, 255, 0.14)',
        neon: '#00e5ff',
        electric: '#00aaff',
        panel: 'rgba(10, 18, 28, 0.62)',
        border: 'rgba(0, 229, 255, 0.18)',
        ink: '#d8fbff'
      },
      boxShadow: {
        glow: '0 0 18px rgba(0, 229, 255, 0.35), 0 0 40px rgba(0, 170, 255, 0.18)',
        strong: '0 0 40px rgba(0, 229, 255, 0.45), 0 0 120px rgba(0, 170, 255, 0.18)'
      },
      backgroundImage: {
        'grid-radial': 'radial-gradient(circle at top, rgba(0,229,255,0.12), transparent 44%), linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.98)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-120% 0' },
          '100%': { backgroundPosition: '120% 0' }
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0, 0 0, 0 0' },
          '100%': { backgroundPosition: '0 120px, 120px 0, 0 0' }
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.72' }
        },
        scan: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(220%)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 5.5s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        gridMove: 'gridMove 18s linear infinite',
        flicker: 'flicker 5.2s linear infinite',
        scan: 'scan 7s linear infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};

export default config;
