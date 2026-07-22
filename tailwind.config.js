/**
 * Configuración de Tailwind CSS optimizada
 * @file tailwind.config.js
 */

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],

  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Violet
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },

      // Espaciado extendido
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },

      // Animaciones personalizadas
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-in',
        'slide-in': 'slide-in 0.4s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Transiciones
      transitionDuration: {
        DEFAULT: '150ms',
        250: '250ms',
        300: '300ms',
        350: '350ms',
        400: '400ms',
        500: '500ms',
      },

      // Tipografía
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      // Z-index
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        modal: '1040',
      },

      // Sombras
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },

      // Responsive
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },

  plugins: [
    // Text clamp
    function ({ addUtilities }) {
      const newUtilities = {
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      };

      addUtilities(newUtilities);
    },

    // Safe area support
    function ({ addUtilities }) {
      const safeUtilities = {
        '.safe-area-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      };

      addUtilities(safeUtilities);
    },
  ],

  // Optimización
  safelist: [
    // Colores de categorías
    'from-violet-600',
    'to-purple-600',
    'from-blue-600',
    'to-cyan-600',
    'from-green-600',
    'to-emerald-600',
    'from-pink-600',
    'to-rose-600',
    'from-amber-600',
    'to-orange-600',
  ],

  corePlugins: {
    preflight: true,
  },

  darkMode: 'class',
};

module.exports = config;
