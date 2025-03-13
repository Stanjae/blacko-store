import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: '#_next',
  theme: {
    extend: {
      colors: {
        /* background: "var(--background)",
        foreground: "var(--foreground)", */
        primary:"#e85e71"
      },
    },
  },
  corePlugins: {
    preflight: false,
 },
  plugins: [],
} satisfies Config;
