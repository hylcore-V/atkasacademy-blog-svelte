const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
	theme: {
		extend: {
      spacing: {
        "xxs": "1rem",
        "xs": "2rem",
        "sm": "4rem",
        "md": "8rem",
        "lg": "15rem",
        "xl": "20rem",
        "xxl": "30rem",
        "nav": "4.5rem",
        "big-nav": "6rem",
      },
      colors: {
        neutral: {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#e5e5e5",
          "300": "#d4d4d4",
          "400": "#a3a3a3",
          "500": "#737373",
          "600": "#525252",
          "700": "#404040",
          "800": "#262626",
          "900": "#171717",
          "950": "#0a0a0a",
          DEFAULT: "#262626",
        },
        "footer": "#ececec",
        "dark-footer": "#434343",
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        zhanku: ["ZhanKu", ...defaultTheme.fontFamily.serif],
        jost: ["Jost Variable", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "waves": "url(/footer/light-waves.svg)",
        "dark-waves": "url(/footer/dark-waves.svg)"
      },
      borderRadius: {
        "sm": "4px",
        // "md": "0px"
      },
      screens: {
        "2xl": "1440px",
      },
      height: {
        "screen": "100dvh",
      },
    },
	},
	plugins: [require("@tailwindcss/typography")],
}
