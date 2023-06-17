/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-latam': '#249d54',
      },
      backgroundColor: {
        'components': '#FFFFFF'
      },
      gridTemplateColumns: {
        'twomaincolumn': '3fr 1fr'
      }
    }
    
  },
  plugins: [],

  
}

