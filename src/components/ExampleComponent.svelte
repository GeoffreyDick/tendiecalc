<svelte:options immutable />

<script>
  export let title;
  export let paragraph;
</script>

<h1 class="text-3xl text-primary font-bold">{title}</h1>
<p class="mt-4 text-primary opacity-75">{paragraph}</p>
