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

<section>
  <h2 class="text-3xl font-bold mb-4 lg:mb-8">Setup</h2>
  <div class="space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
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
        label="Your currency"
        options={Object.keys($exchangeRates.rates)}
        bind:value={$localCurrency}
      />
    </div>
  </div>
</section>
