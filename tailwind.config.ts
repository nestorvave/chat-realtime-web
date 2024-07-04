/* eslint-disable no-undef */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        logo: "#0092CA",
        main: "#030448",
      },
      backgroundColor: {
        softBlue: "#F3F7F8",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
      },
      animation: {
        bouncing: "bounce 3.5s infinite ",
      },
    },
  },
  plugins: [],
};

export default config;
