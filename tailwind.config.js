/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {

    daisyui: {
      base: false,
    },

    fontSize: {

      xs: "0.75rem",
      sm: "0.875rem",
      tiny: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",

      
    },
    

    screenSizes: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      },
      
    extend: {

      fontFamily: {
        mainfont: ['"bebas-neue-pro"', 'sans-serif'],
        bitfont: ['"2bit"', 'sans-serif'],
        
      },
      
      colors: { 
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        dark: "var(--dark)",
        light: "var(--light)",

      }
    },
  },
  plugins: [require("daisyui")],
}
