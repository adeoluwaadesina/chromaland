import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF8D6",
          100: "#FFEE9E",
          300: "#FFD54F",
          500: "#F9A825",
          700: "#F57C00",
        },
        ink: "#0B0B0B",
        muted: "#6B7280",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #FFEE9E 0%, #FFD54F 35%, #F9A825 65%, #F57C00 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
        screens: {
          "2xl": "1280px",
        },
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        subtle: "0 20px 45px -20px rgba(11, 11, 11, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
