<script lang="ts">
  import InputNumber from "./inputs/InputNumber.svelte";
  import { shares, averageCost, memePrice, taxRate } from "../stores/store.js";
</script>

<section class="py-8 lg:py-24">
  <h1 class="text-3xl font-bold mb-8">Setup</h1>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
    <InputNumber
      name="memePrice"
      label="What is NOT A MEME?"
      prefix="$USD"
      bind:value={$memePrice}
    />
    <InputNumber
      name="taxRate"
      label="Expected Tax Rate"
      prefix="%"
      bind:value={$taxRate}
    />
  </div>
</section>
