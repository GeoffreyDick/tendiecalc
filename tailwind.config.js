const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");
const tailwindForms = require("@tailwindcss/forms");

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
			padding: "1rem",
		},
		fontFamily: {
			monospace: ["Inconsolata", "monospace"],
		},
		extend: {
			colors: {
				dark: "#161615",
				darkish: "#2a2a29",
				primary: "#daa144",
				down: "#ed6a53",
				up: "#26ae56",
			},
		},
	},
	variants: {
		extend: {
			ringWidth: ["focus-within"],
			ringColor: ["focus-within"],
			ringOpacity: ["focus-within"],
		},
	},
	plugins: [
		tailwindForms,
	],
};
