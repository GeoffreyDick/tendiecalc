<script lang="ts">
  import Clipboard from "./Clipboard.svelte";
  import {
    shares,
    notMemePrice,
    averageCost,
    taxRate,
    localCurrency,
  } from "../stores/store.js";

  $: myUrl = `https://tendiecalc.com?notMemePrice=${$notMemePrice}&shares=${$shares}&averageCost=${$averageCost}&taxRate=${$taxRate}&localCurrency=${$localCurrency}`;
</script>

<nav
  class="container max-w-7xl pt-4 lg:pt-12 flex flex-col space-y-4 sm:flex-row justify-between sm:items-end"
>
  <h1 class="text-3xl font-bold">TendieCalc</h1>
  <div class="flex flex-col space-y-2">
    <span class="text-sm text-right opacity-75">
      Add this URL to your bookmarks to save your setup
    </span>
    <div class="ml-auto flex w-full">
      <input
        disabled
        type="text"
        class="w-full bg-darkish text-white text-opacity-50 border-none rounded-l-xl z-10"
        bind:value={myUrl}
      />
      <Clipboard value={myUrl} />
    </div>
  </div>
</nav>
