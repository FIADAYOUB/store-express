<script>
  import { createEventDispatcher } from "svelte";

  export let qte = 0;
  export let maxQte = 4;

  const dispatch = createEventDispatcher();

  function handleChange(isAdd) {
    if (isAdd) {
      qte++
    } else {
      qte--
    }
    dispatch("change", {
      qte,
      isAdd
    });
  }
</script>

<div class="flex items-center justify-center gap-3 mt-4">
  <span>Quantity</span>
  <div class="grow"></div>
  <div class="flex items-center justify-center">
    <button
      type="button"
      on:click={() => {handleChange(false)}}
      disabled={qte === 1}
      class="relative overflow-hidden border border-[#CCC] h-[35px] w-[35px] p-0 bg-gray-50 disabled:bg-[#E0E0E0] disabled:text-gray-400 font-bold rounded-l-md"
    >
      -
    </button>
    <input
      type="number"
      bind:value={qte}
      disabled
      class="pl-2 relative overflow-hidden border-y border-[#CCC] h-[35px] w-fit max-w-[50px] outline-none text-center"
    />
    <button
      type="button"
      on:click={() => handleChange(true)}
      disabled={qte === maxQte}
      class="relative overflow-hidden border border-[#CCC] h-[35px] w-[35px] p-0 bg-gray-50 disabled:bg-[#E0E0E0] disabled:text-gray-400 font-bold rounded-r-md"
    >
      +
    </button>
  </div>
</div>
{#if qte === maxQte}
  <p class="text-red-500 text-[12px] text-end">
    You have attend the maximum quantity
  </p>
{/if}
