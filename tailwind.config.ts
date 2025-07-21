import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[300],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          ["dark-hover"]: colors.neutral[900],
        },
        darkBg: "#121212",
        lighterBg: "#E4E4E4",
        lightBg: "#FFFFFF",
        darkText: "#E4E4E4",
        darkerText: "#121212",
        lightText: "#222222",
      },
    },
  },
  plugins: [],
};

export default config;
