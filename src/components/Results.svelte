<script lang="ts">
  import currency from "currency.js";
  import {
    shares,
    taxRate,
    totalCost,
    localCurrency,
  } from "../stores/store.js";
  import { exchangeRates } from "../stores/exchange-rates.js";

  const USD = (value: currency | number) =>
    currency(value, { symbol: "USD ", precision: 2 });

  export let title!: string;
  export let pricePerShare!: number;
  export let spendOnText!: string;

  $: preTaxValue = currency(pricePerShare).multiply($shares);
  $: postTaxValue = currency(profitLoss).multiply(1 - $taxRate / 100);
  $: profitLoss = currency(preTaxValue).subtract($totalCost);
  $: percentChange = currency(profitLoss, { symbol: "" })
    .divide($totalCost)
    .multiply(100)
    .format();
  $: localCurrencyString = $localCurrency.toString();
  $: currencyOptions = {
    symbol: `${$localCurrency} `,
    precision: 2,
  };
</script>

<div class="flex flex-col space-y-4">
  <h2 class="text-3xl font-bold">{title}</h2>
  <div
    class="rounded-xl p-8 lg:p-16 bg-darkish flex flex-col space-y-2 lg:space-y-4 overflow-hidden"
  >
    <h3 class="text-primary font-medium tracking-wider">Pre-Tax Value</h3>
    <span class="text-primary text-3xl lg:text-5xl font-bold"
      >{currency(preTaxValue, currencyOptions)
        .multiply($exchangeRates.rates[localCurrencyString])
        .format()}</span
    >
    {#if currency(profitLoss).value > 0}
      <span class="text-up font-medium tracking-wider"
        >&blacktriangle; {currency(profitLoss, currencyOptions)
          .multiply($exchangeRates.rates[localCurrencyString])
          .format()} ({percentChange}%)</span
      >
    {:else if currency(profitLoss).value < 0}
      <span class="text-down font-medium tracking-wider"
        >&blacktriangledown; {currency(profitLoss, currencyOptions)
          .multiply($exchangeRates.rates[localCurrencyString])
          .format()} ({percentChange}%)</span
      >
    {:else}
      <span class="text-white opacity-50 font-medium tracking-wider"
        >&#8210; {currency(profitLoss, currencyOptions)
          .multiply($exchangeRates.rates[localCurrencyString])
          .format()} ({percentChange}%)</span
      >
    {/if}
  </div>
  <span class="italic leading-relaxed"
    >At a {$taxRate}% tax rate, you will need to set aside
    <span class="text-white font-medium tracking-wide opacity-75"
      >{currency(profitLoss, currencyOptions)
        .multiply($taxRate / 100)
        .multiply($exchangeRates.rates[localCurrencyString])
        .format()}</span
    >
    of your tendies for taxes, leaving you with
    <span class="text-white font-medium tracking-wide opacity-75">
      {currency(preTaxValue, currencyOptions)
        .subtract(currency(profitLoss).multiply($taxRate / 100))
        .multiply($exchangeRates.rates[localCurrencyString])
        .format()}
    </span>
    to spend on {spendOnText}</span
  >
</div>
