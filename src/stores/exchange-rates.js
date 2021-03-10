import { writable } from "svelte/store";

export const exchangeRates = writable({
	rates: {
		CAD: 1.2670655655, HKD: 7.768666779, ISK: 128.6870048879, PHP: 48.7131299511, DKK: 6.2668127423, HUF: 309.4471599528, CZK: 22.2627675712, GBP: 0.7224675544, RON: 4.1169728636, SEK: 8.5793864824, IDR: 14360.0033709759, INR: 73.3587561099, BRL: 5.7498735884, RUB: 74.7857744817, HRK: 6.3863138379, JPY: 108.6296982977, THB: 30.789651104, CHF: 0.9343502444, EUR: 0.8427439744, MYR: 4.1075341311, BGN: 1.6482386651, TRY: 7.6741951795, CNY: 6.526714984, NOK: 8.5778695432, NZD: 1.4051070285, ZAR: 15.4712624305, USD: 1, MXN: 21.5539356144, SGD: 1.3480532614, AUD: 1.3061688859, ILS: 3.3382774313, KRW: 1139.1201752907, PLN: 3.8767908309,
	},
	base: "USD",
	date: "2021-03-08",
});