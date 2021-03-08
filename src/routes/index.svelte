<script>
  import Position from "../components/Position.svelte";
  import Results from "../components/Results.svelte";
  import { currentPrice, memePrice } from "../stores/store.js";
</script>

<svelte:head>
  <title>TendieCalc | Tendies for 💎🙌 vs 🧻🙌</title>
</svelte:head>

<div class="container max-w-7xl">
  <Position />
  <div class="py-8 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
    <Results title="Tendies for 🧻🙌" pricePerShare={$currentPrice} />
    <Results title="Tendies for 💎🙌" pricePerShare={$memePrice} />
  </div>
</div>

<style>
</style>
