module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
      },
      boxShadow: {
        none: 'none',
      },
    },
    boxSizing: {
      borderBox: 'border-box',
    },
    fontFamily: {
      sans: ['sans-serif'],
      serif: ['serif'],
      mono: ['monospace'],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
}
