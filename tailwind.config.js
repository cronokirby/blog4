const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./layouts/**/*.html"],
  theme: {
    extend: {
      boxShadow: {
        "hard-sm": "-2px 2px currentcolor",
        hard: "-4px 4px currentcolor",
        "hard-lg": "-8px 8px currentcolor",
      },
    },
    fontFamily: {
      mono: ["Iosevka", "monospace"],
      sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
