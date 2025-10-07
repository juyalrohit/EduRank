
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Adjust paths based on your project structure
    ],
    theme: {
      extend: {
        keyframes: {
            typing: {
              '0%': { width: '0%' },
              '100%': { width: '100%' },
            },
            blink: {
              '0%, 100%': { 'border-color': 'transparent' },
              '50%': { 'border-color': 'black' },
            },
          },
          animation: {
            typing: 'typing 4s steps(30, end) forwards', // Typing effect
            blink: 'blink 0.7s step-end infinite',       // Blinking cursor
          },
        
      }, // Add custom styles or animations here
    },
    plugins: [require("daisyui")],
  };
  