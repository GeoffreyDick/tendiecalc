<script context="module">
  export const preload = () => {};
</script>

<script>
  import { stores } from "@sapper/app";
  import AppFooter from "../components/AppFooter.svelte";
  import AppNav from "../components/AppNav.svelte";

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  export let segment = "";
  // Silence unused export property warning
  // eslint-disable-next-line no-empty
  if (segment) {
  }

  const { page } = stores();
  $: path = $page.path.slice(1);
</script>

<svelte:head>
  <title>
    {path ? path.charAt(0).toUpperCase() + path.slice(1) : "TendieCalc"}
  </title>
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/favicon/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/favicon/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/favicon/favicon-16x16.png"
  />
  <link rel="manifest" href="/favicon/site.webmanifest" />
</svelte:head>

<AppNav />
<main class="flex-grow overflow-hidden">
  <slot />
</main>
<AppFooter />
