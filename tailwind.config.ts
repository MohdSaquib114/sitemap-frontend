import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#EAF0EC",
        surface: "#FBFCFA",
        ink: { DEFAULT: "#101E1A", muted: "#55685F" },
        accent: { DEFAULT: "#C1861E", hover: "#A66F14" },
        line: "#B9C7BE",
      },
      fontFamily: {
        sans: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
} satisfies Config;