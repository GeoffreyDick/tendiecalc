import { writable } from "svelte/store";

export const intraday = writable({
	open: 0,
	high: 0,
	low: 0,
	last: 0,
	close: 0,
	volume: 0,
	date: "",
	symbol: "",
	exchange: "",
});
