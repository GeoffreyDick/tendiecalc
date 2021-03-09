<script lang="ts">
  import InputNumber from "./inputs/InputNumber.svelte";
  import {
    shares,
    averageCost,
    notMemePrice,
    taxRate,
    localCurrency,
  } from "../stores/store.js";
  import { exchangeRates } from "../stores/exchange-rates.js";
  import InputSelect from "./inputs/InputSelect.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-16">
  <section class="py-8 lg:py-24 space-y-8">
    <h1 class="text-3xl font-bold">Setup</h1>
    <div class="grid grid-cols-2 gap-4 md:gap-8">
      <InputNumber
        name="notMemePrice"
        label="What is NOT A MEME?"
        prefix="$USD"
        bind:value={$notMemePrice}
      />
    </div>
    <div class="grid grid-cols-2 gap-4 md:gap-8">
      <InputNumber
        name="shares"
        label="Number of Shares"
        prefix="#"
        bind:value={$shares}
      />
      <InputNumber
        name="averageCost"
        label="Average Cost"
        prefix="$USD"
        bind:value={$averageCost}
      />
    </div>

    <div class="grid grid-cols-2 gap-4 md:gap-8">
      <InputNumber
        name="taxRate"
        label="Expected Tax Rate"
        prefix="%"
        bind:value={$taxRate}
      />
      <InputSelect
        name="localCurrency"
        label="Your local currency"
        options={Object.keys($exchangeRates.rates)}
        bind:value={$localCurrency}
      />
    </div>
  </section>
</div>
