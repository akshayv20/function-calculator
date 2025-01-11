/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}" // Update with your file paths
  ],
  theme: {
    extend: {
      width: {
        235: "228px"
      },
      height: {
        251: "244px"
      }
    }
  },
  plugins: []
};
