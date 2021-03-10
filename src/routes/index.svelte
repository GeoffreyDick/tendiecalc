<script context="module">
  export async function preload({ query }) {
    // Set store states if queries exist on route
    return { query };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import Setup from "../components/Setup.svelte";
  import Results from "../components/Results.svelte";
  import {
    notMemePrice,
    shares,
    averageCost,
    localCurrency,
  } from "../stores/store.js";
  import { exchangeRates } from "../stores/exchange-rates.js";
  import { intraday } from "../stores/intraday.js";

  import axios, { AxiosPromise } from "axios";
  import MarketPrice from "../components/MarketPrice.svelte";

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
  <title>TendieCalc | 💎🙌 vs. 🧻🙌 gains</title>
  <meta
    name="description"
    content="Are you a Gamestop 🦍? Thinking you might have 🧻🙌? TendieCalc will show you your potential 💎🙌 tendies."
  />
  <link rel="canonical" href="https://tendiecalc.com" />
  <meta property="og:title" content="TendieCalc | 💎🙌 vs 🧻🙌 gains" />
  <meta
    property="og:description"
    content="Are you a Gamestop 🦍? Thinking you might have 🧻🙌? TendieCalc will show you your potential 💎🙌 tendies."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tendiecalc.com" />
  <meta property="og:image" content="/og_img.png" />
</svelte:head>

<div class="container max-w-7xl py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 lg:py-24">
    <MarketPrice />
    <Setup />
  </div>
  <div class="py-8 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
    <Results
      title="Tendies for 💎🙌"
      pricePerShare={$notMemePrice}
      spendOnText="Lambos, questionable tattoos, and charity."
    />
    <Results
      title="Tendies for 🧻🙌"
      pricePerShare={$intraday.last || $intraday.close}
      spendOnText="student loans, credit card minimum payments, and presents for your wife's boyfriend."
    />
  </div>
</div>

<style>
</style>
