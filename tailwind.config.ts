import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontSize: {
      "2xs": "1rem",
      xs: "1rem",
      sm: "1.2rem",
      md: "1.4rem",
      base: "1.6rem",
      lg: "1.8rem"
    },
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1520px",
      xl: "1520px",
      "2xl": "1920px"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        xs: "2rem",
        sm: "2rem",
        md: "2rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem"
      },
      screens: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "1520px",
        xl: "1520px",
        "2xl": "1520px"
      }
    },
    extend: {
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "-0.015em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      colors: {
        background: {
          DEFAULT: "#ffffff"
        },
        foreground: {
          DEFAULT: "#0a0a0a"
        },
        primary: {
          DEFAULT: "#0793ea",
          foreground: "#fafafa"
        },
        secondary: {
          DEFAULT: "#002c5f",
          foreground: "#fafafa"
        },
        destructive: {
          DEFAULT: "#FF6633",
          foreground: "#fafafa"
        },
        constructive: {
          DEFAULT: "#00C300"
        },
        black: "#000000",
        gray: "#999999",
        gray2: "#D9D9D9",
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#0a0a0a",
        outlink: "#18A0FB",
        white: "#ffffff"
      },
      borderRadius: {
        lg: "0.7rem",
        md: "calc(0.7rem - 2px)",
        sm: "calc(0.7rem - 4px)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
