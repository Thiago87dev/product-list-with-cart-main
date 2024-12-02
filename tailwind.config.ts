import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorRed: 'hsl(14, 86%, 42%)',
        colorGreen: 'hsl(159, 69%, 38%)',
        colorRose50: 'hsl(20, 50%, 98%)',
        colorRose100: 'hsl(13, 31%, 94%)',
        colorRose300: 'hsl(14, 25%, 72%)',
        colorRose400: 'hsl(7, 20%, 60%)',
        colorRose500: 'hsl(12, 20%, 44%)',
        colorRose900: 'hsl(14, 65%, 9%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
