/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/client/**/*.{ts,tsx}', './public/index.html'],
	theme: {
		container: {
			center: true,
			padding: '1.5rem'
		},
		extend: {}
	},
	plugins: [require('tailwindcss-debug-screens')]
};
