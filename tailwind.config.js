/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    ".index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        light:'6px 6px 24px 0px rgba(0, 0, 0, 0.5), inset -0px -0px 16px 0px rgba(0, 0, 0, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
        dark: 'inset -12px -8px 16px 0px rgba(4, 4, 4, 0.6),inset 12px 8px 16px 0px rgba(47, 47, 47, 0.47);',
        headerDark: 'inset 12px 8px 16px 0px rgba(47, 47, 47, 0.47), inset -12px -8px 16px 0px rgba(4, 4, 4, 0.6);',
        headerLight:'-7px 2px 9px 0px rgba(0, 0, 0, 0.693), inset -0px -0px 16px 0px rgba(0, 0, 0, 0.522), inset  0px 11px 28px 0px rgb(255, 255, 255);',
        modalLight : '6px 6px 24px 0px rgba(0, 0, 0, 0.5), inset -0px -0px 16px 0px rgba(0, 0, 0, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
        modalDark : 'inset -12px -8px 16px 0px rgba(4, 4, 4, 0.6),inset 12px 8px 16px 0px rgba(47, 47, 47, 0.47)',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

