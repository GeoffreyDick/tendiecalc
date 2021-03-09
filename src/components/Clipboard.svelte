<script>
  import { tick } from "svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let showSuccess: boolean = false;
  let valueCopy: string | null = null;
  export let value: string | null = null;
  let areaDom;

  async function copy() {
    valueCopy = value;
    await tick();
    areaDom.focus();
    areaDom.select();
    let message = "Copying text was successful";
    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        message = "Copying text was unsuccessful";
      } else {
        showSuccess = true;
        await tick();
        showSuccess = false;
      }
    } catch (err) {
      message = "Oops, unable to copy";
    }

    // we can notifi by event or storage about copy status
    console.log(message);
    valueCopy = null;
  }
</script>

{#if valueCopy != null}
  <textarea bind:this={areaDom}>{valueCopy}</textarea>
{/if}
<div class="relative z-0">
  {#if showSuccess}
    <div
      out:fly={{
        x: -200,
        opacity: 100,
        delay: 500,
        duration: 2000,
        easing: quintOut,
      }}
      class="w-full h-full absolute top-0 left-0 bg-up text-dark font-semibold px-4 py-3 rounded-r-xl text-center"
    >
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        /></svg
      >
    </div>
  {/if}
  <button
    on:click={copy}
    class="bg-primary hover:bg-opacity-90 focus:outline-none transition-all duration-100 text-dark font-semibold px-4 py-3 rounded-r-xl"
    ><svg
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path
        d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
      /></svg
    ></button
  >
</div>

<style>
  textarea {
    position: fixed;
    top: 0;
    left: 0;
    width: 2em;
    height: 2em;
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
  }
</style>
