<script context="module">
  export async function preload({ query }) {
    // Set store states if queries exist on route
    return { query };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import Position from "../components/Position.svelte";
  import Results from "../components/Results.svelte";
  import {
    notMemePrice,
    shares,
    averageCost,
    localCurrency,
    currentPrice,
  } from "../stores/store.js";
  import { exchangeRates } from "../stores/exchange-rates.js";

  import axios, { AxiosPromise } from "axios";

  export let query;

  onMount(async () => {
    // Set store from query params
    if (query.notMemePrice) {
      $notMemePrice = query.notMemePrice;
    }
    if (query.shares) {
      $shares = query.shares;
    }
    if (query.averageCost) {
      $averageCost = query.averageCost;
    }
    if (query.localCurrency) {
      $localCurrency = query.localCurrency;
    }

    // Fetch exchange rates
    const res: any = await axios(
      `https:api.tendiecalc.com/api/exchange-rates`
    ).then(({ data }) => data);
    $exchangeRates = await res;
  });
</script>

<svelte:head>
  <title>TendieCalc | Tendies for 💎🙌 vs 🧻🙌</title>
</svelte:head>

<div class="container max-w-7xl">
  <Position />
  <div class="py-8 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
    <Results
      title="Tendies for 🧻🙌"
      pricePerShare={$currentPrice}
      spendOnText="student loans, credit card minimum payments, and presents for your wife's boyfriend."
    />
    <Results
      title="Tendies for 💎🙌"
      pricePerShare={$notMemePrice}
      spendOnText="Lambos, questionable tattoos, and charity."
    />
  </div>
</div>

<style>
</style>
