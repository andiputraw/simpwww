// import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", 'Liberation Mono', 'Courier New',
            "monospace"],
        heading: ["JetBrains Mono"], // optional alias
      },
    },
  },
  plugins: [],
};
