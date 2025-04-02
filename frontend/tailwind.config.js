/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Prompt: ["Prompt", "sans-serif"],
        PromptMedium: ["Prompt-Medium", "sans-serif"],
        PromptBold: ["Prompt-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}