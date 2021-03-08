<script lang="ts">
  import currency from "currency.js";
  import { shares, taxRate, totalCost } from "../stores/store.js";

  const USD = (value: currency | number) =>
    currency(value, { symbol: "$", precision: 2 });

  export let title!: string;
  export let pricePerShare!: number;

  $: preTaxValue = currency(pricePerShare).multiply($shares);
  $: postTaxValue = currency(preTaxValue).multiply(1 - $taxRate / 100);
  $: profitLoss = currency(preTaxValue).subtract($totalCost);
  $: percentChange = currency(profitLoss, { symbol: "" })
    .divide($totalCost)
    .multiply(100)
    .format();
</script>

<div class="flex flex-col space-y-4">
  <h2 class="text-3xl font-bold">{title}</h2>
  <div class="rounded-xl p-16 bg-darkish flex flex-col space-y-4">
    <h3 class="text-primary font-medium tracking-wider">Pre-Tax Value</h3>
    <span class="text-primary text-5xl font-bold"
      >{USD(preTaxValue).format()}</span
    >
    {#if currency(profitLoss).value > 0}
      <span class="text-up font-medium tracking-wider"
        >&blacktriangle; {profitLoss.format()} ({percentChange}%)</span
      >
    {:else if currency(profitLoss).value < 0}
      <span class="text-down font-medium tracking-wider"
        >&blacktriangledown; {profitLoss.format()} %10,000</span
      >
    {:else}
      <span class="text-white opacity-50 font-medium tracking-wider"
        >&#8210; {profitLoss} %10,000</span
      >
    {/if}
  </div>
  <span class="text-sm italic"
    >At a {$taxRate}% tax rate, you will need to set aside {profitLoss
      .multiply($taxRate / 100)
      .format()} of your tendies for taxes.</span
  >
</div>
