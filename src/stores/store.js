import { writable, derived } from "svelte/store";
import currency from "currency.js";

export const shares = writable(5);
export const averageCost = writable(120.00);
export const notMemePrice = writable(500000.00);
export const taxRate = writable(30);
export const localCurrency = writable("USD");

export const totalCost = derived([shares, averageCost], ([$shares, $averageCost]) => currency($averageCost).multiply($shares));
