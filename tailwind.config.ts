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
        mainDark: "#0E0E11",
        grayDark: "#3C3D43",
        whiteDark: "#E6E6E6",
      },
      backgroundColor: {
        mainDark: "#0E0E11",
        grayDark: "#3C3D43",
        whiteDark: "#E6E6E6",
      },

    },
  },
  plugins: [],
};

export default config;
