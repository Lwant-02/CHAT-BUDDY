/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: " var(--side-bar)",
        chatarea: "var(--chat-area)",
        grey: {
          0: "var(--color-grey-0)",
          50: "var(--color-grey-50)",
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          300: "var(--color-grey-300)",
          400: "var(--color-grey-400)",
          500: "var(--color-grey-500)",
          600: "var(--color-grey-600)",
          700: "var(--color-grey-700)",
          800: "var(--color-grey-800)",
          900: "var(--color-grey-900)",
        },
        blue: {
          100: "var(--color-blue-100)",
          700: "var(--color-blue-700)",
        },
        green: {
          100: "var(--color-green-100)",
          700: "var(--color-green-700)",
        },
        yellow: {
          100: "var(--color-yellow-100)",
          700: "var(--color-yellow-700)",
        },
        silver: {
          100: "var(--color-silver-100)",
          700: "var(--color-silver-700)",
        },
        indigo: {
          100: "var(--color-indigo-100)",
          700: "var(--color-indigo-700)",
        },
        red: {
          100: "var(--color-red-100)",
          700: "var(--color-red-700)",
          800: "var(--color-red-800)",
        },
        backdrop: "var(--backdrop-color)",
        shadow: {
          sm: "var(--shadow-sm)",
          md: "var(--shadow-md)",
          lg: "var(--shadow-lg)",
        },
        image: {
          grayscale: "var(--image-grayscale)",
          opacity: "var(--image-opacity)",
        },
      },
    },
  },
  plugins: [],
};
