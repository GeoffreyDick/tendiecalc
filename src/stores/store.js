import { writable, derived, readable } from "svelte/store";
import currency from "currency.js";

export const shares = writable(1);
export const averageCost = writable(100.00);
export const currentPrice = readable(150.00);
export const notMemePrice = writable(500000.00);
export const taxRate = writable(30);
export const localCurrency = writable("CAD");

export const totalCost = derived([shares, averageCost], ([$shares, $averageCost]) => currency($averageCost).multiply($shares));
export const currentProfit = derived([shares, averageCost, currentPrice], ([$shares, $averageCost, $currentPrice]) => currency());
