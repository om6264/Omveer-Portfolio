import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#171717",
        "primary-foreground": "#ffffff",
        secondary: "#f5f5f5",
        "muted-foreground": "#707070",
        border: "#e5e5e5",
        ring: "#171717",
        card: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
