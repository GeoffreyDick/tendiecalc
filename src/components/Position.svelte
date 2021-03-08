<script lang="ts">
  import InputNumber from "./inputs/InputNumber.svelte";
  import { shares, averageCost, memePrice, taxRate } from "../stores/store.js";
</script>

<h1 class="text-3xl font-bold mb-8">Setup</h1>
<div class="flex flex-wrap gap-4">
  <InputNumber
    name="shares"
    label="Number of Shares"
    prefix="#"
    bind:value={$shares}
  />
  <InputNumber
    name="averageCost"
    label="Average Cost (per Share)"
    prefix="$USD"
    bind:value={$averageCost}
  />
  <InputNumber
    name="memePrice"
    label="What is NOT A MEME? (per share)"
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
