const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	purge: {
		content: ["./src/**/*.html", "./src/**/*.svelte"],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
					([_match, group, ..._rest]) => group,
				),
			],
			keyframes: true,
		},
	},
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "2rem",
		},
		extend: {
			colors: {
				dark: "#161615",
				primary: "#daa144",
				down: "#cf4935",
				up: "#199a51",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
