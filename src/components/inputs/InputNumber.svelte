<script lang="ts">
  export let name!: string;
  export let label!: string;
  export let prefix: string | undefined = undefined;
  export let value!: any;

  const onInput = (e: any) => (value = e.target.value);
</script>

<div class="flex flex-col space-y-1 lg:space-y-3">
  <label for={name} class="text-sm lg:text-md opacity-75">{label}</label>
  <div
    class="flex h-8 lg:h-10 rounded-xl focus-within:ring-4 focus-within:ring-primary focus-within:ring-opacity-25"
  >
    {#if prefix}
      <div
        class="h-full px-2 lg:px-4 rounded-l-xl bg-primary text-sm text-dark font-semibold flex flex-col justify-around"
      >
        {prefix}
      </div>
    {/if}
    <input
      {name}
      type="number"
      {value}
      class="{prefix
        ? 'rounded-r-xl'
        : 'rounded-xl'} w-full h-full border-none bg-darkish text-primary focus:ring-transparent"
      on:input={onInput}
    />
  </div>
</div>
