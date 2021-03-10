<script lang="ts">
  import axios from "axios";
  import currency from "currency.js";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import localizedFormat from "dayjs/plugin/localizedFormat";
  import advancedFormat from "dayjs/plugin/advancedFormat";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.extend(advancedFormat);

  import { onDestroy, onMount } from "svelte";
  import { intraday } from "../stores/intraday.js";

  type Timezone = {
    timezone: string;
    abbr: string;
    abbr_dst: string;
  };

  type StockExchange = {
    name: string;
    acronym: string;
    mic: string;
    country: string;
    country_code: string;
    city: string;
    website: string;
    timezone: Timezone;
  };

  type Ticker = {
    name: string;
    symbol: string;
    stock_exchange: StockExchange;
  };

  let symbol: string = "GME";
  let ticker: Ticker = {
    name: "",
    symbol: "",
    stock_exchange: {
      name: "",
      acronym: "",
      mic: "",
      country: "",
      country_code: "",
      city: "",
      website: "",
      timezone: {
        timezone: "",
        abbr: "",
        abbr_dst: "",
      },
    },
  };
  let exchange: StockExchange = {
    name: "",
    acronym: "",
    mic: "",
    country: "",
    country_code: "",
    city: "",
    website: "",
    timezone: {
      timezone: "UTC",
      abbr: "",
      abbr_dst: "",
    },
  };
  let interval: any = null;

  async function fetchIntraday() {
    $intraday = await axios(`marketstack-intraday?ticker=${symbol}`, {
      baseURL: "https://tendiecalc-api-geoffdick.vercel.app/",
    }).then(({ data }) => data);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onMount(async () => {
    // Fetch data from symbol
    ticker = await axios(`marketstack-ticker?ticker=${symbol}`, {
      baseURL: "https://tendiecalc-api-geoffdick.vercel.app/",
    }).then(({ data }) => data);
    exchange = await axios(
      `marketstack-exchange?exchange=${ticker.stock_exchange.mic}`,
      { baseURL: "https://tendiecalc-api-geoffdick.vercel.app/" }
    ).then(({ data }) => data);
    // Fetch intraday every 1min
    fetchIntraday();
    interval = setInterval(() => fetchIntraday(), 30000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  $: dayChange = currency($intraday.last).subtract($intraday.close);
  $: percentChange = (
    currency(dayChange, { precision: 4 }).divide($intraday.close).value * 100
  ).toFixed(2);
  $: currencyOptions = {
    symbol: "USD ",
    precision: 2,
  };
</script>

<section>
  <h2 class="text-3xl font-bold mb-4 lg:mb-8">Market Price</h2>
  {JSON.stringify($intraday)}
  <div
    class="bg-darkish rounded-xl p-8 lg:p-16 flex flex-col space-y-4 justify-center"
  >
    <div class="flex flex-col space-y-4">
      <h3 class="text-primary font-medium tracking-wider">
        {ticker.name} ({symbol})
      </h3>
      <span class="text-primary text-3xl lg:text-4xl font-bold"
        >USD {currency(
          $intraday.last || $intraday.close,
          currencyOptions
        )}</span
      >
      {#if currency(dayChange).value > 0}
        <span class="text-up font-medium tracking-wider"
          >&blacktriangle; {currency(dayChange, currencyOptions).format()} ({percentChange}%)</span
        >
      {:else if currency(dayChange).value < 0}
        <span class="text-down font-medium tracking-wider"
          >&blacktriangledown; {currency(dayChange, currencyOptions).format()} ({percentChange}%)</span
        >
      {:else}
        <span class="text-white opacity-50 font-medium tracking-wider"
          >&#8210; {currency(dayChange, currencyOptions).format()} ({percentChange}%)</span
        >
      {/if}
    </div>
    <footer
      class="pt-4 border-t-4 border-white border-opacity-10 text-white opacity-50 text-xs"
    >
      Last update from
      {dayjs($intraday.date).tz(exchange.timezone.timezone).format("LT")} market
      time.
    </footer>
  </div>
</section>
