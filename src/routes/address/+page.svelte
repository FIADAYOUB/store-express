<script>
  import Icon from '@iconify/svelte';
  import {page} from '$app/stores';

  console.log({$page});

  let isWorking = false;
</script>

<div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
  <div class="mx-auto bg-white rounded-lg p-3">
    <div class="text-xl text-bold mb-2">Address Details</div>
    <form>
      <input
        class="w-full outline outline-1 rounded-lg py-2 px-3"
        placeholder="Contact Name"
        name="contact"
        type="text"
      />

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="Address"
        name="address"
        type="text"
      />

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="Zip Code"
        name="zipCode"
        type="text"
      />

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="City"
        name="city"
        type="text"
      />

      <input
        class="w-full mt-2  outline outline-1 rounded-lg py-2 px-3"
        placeholder="Country"
        name="country"
        type="text"
      />

      <button
        type="submit"
        class=" mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
      >
      {#if !isWorking}
        <div>Update Address</div>
      {:else}
        <Icon
          icon="eos-icons:loading"
          class="mr-2"
        />
      {/if}
      </button>
    </form>
  </div>
</div>

