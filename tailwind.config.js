module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        'commons':['TT commons']
      },
      screens: {
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
    },
  },
  variants:{
    extends: {
      margin: ['responsive'],
    },
  } ,
  plugins: [],
}

