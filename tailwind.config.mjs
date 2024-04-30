const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
      spacing: {
        "xs": "2rem",
        "sm": "4rem",
        "md": "8rem",
        "lg": "15rem",
        "nav": "5rem",
        "big-nav": "6rem",
      },
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
        zhanku: ["ZhanKu", ...defaultTheme.fontFamily.serif],
      }
    },
	},
	plugins: [],
}
