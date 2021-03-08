<script>
  import Position from "../components/Position.svelte";
  import Results from "../components/Results.svelte";
  import { currentPrice, memePrice } from "../stores/store.js";
</script>

<div class="container max-w-7xl py-24">
  <Position />
  <div class="py-24 grid grid-cols-2 gap-16">
    <Results title="Tendies for 🧻🙌" pricePerShare={$currentPrice} />
    <Results title="Tendies for 💎🙌" pricePerShare={$memePrice} />
  </div>
</div>

<style>
</style>
