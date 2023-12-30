/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgba(254, 162, 0, 1)',
			},
			fontFamily: {
				nunito: ['Nunito'],
			},
		},
	},
	plugins: [],
};
