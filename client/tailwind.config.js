/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4af37',  // primary gold
          600: '#b8960c',
          700: '#92740a',
          800: '#78600a',
          900: '#5c4a0e',
        },
        dark: {
          50:  '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
          300: '#0a0a0a',  // primary dark
          400: '#050505',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #d4af37' },
          '100%': { boxShadow: '0 0 20px #d4af37, 0 0 40px #d4af37' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f5e17a 50%, #d4af37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
      },
    },
  },
  plugins: [],
};
