/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // screens: {
    //   xsm: "375px",

    // },
    extend: {
      screens: {
        xsm: "375px",
        xxsm: "320px",
      },
      colors: {
        primary: "#0077cc",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "chatbot-bg": "url('/src/assets/images/25.png')",
        "mobile-bg-home": "url('/src/assets/images/mobilebghome.png')",
        "mobile-bg-content": "url('/src/assets/images/mobilebgcontent.png')",
        "chatbot-bg2": "url('/src/assets/images/bg2.png)",
        "steps-bg": "url('/src/assets/images/steps.png')",
      },
      letterSpacing: {
        normal: "4px",
      },
    },
  },
  plugins: [],
};
