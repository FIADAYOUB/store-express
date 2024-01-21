<script>
  import Icon from "@iconify/svelte";
  import CheckoutItem from "./CheckoutItem.svelte";
  import { panier } from "$lib/store/cart";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let currentAddress;
  let total = 0;
  let isProcessing = false;
  $: currectUser = $page.data?.session?.user;

  onMount(async () => {
    if ( currectUser) {
      const response = await fetch(`/checkout/?userId=${currectUser.id}`);
      currentAddress = await response.json();
    }
})
</script>

<div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
  <div class="md:flex gap-4 justify-between mx-auto w-full">
    <div class="md:w-[65%]">
      <div class="bg-white rounded-lg p-4">
        <div class="text-xl font-semibold mb-2">Shipping Address</div>
        {#if currentAddress}
          <div>
            <a
              href="/address"
              class="flex items-center pb-2 text-blue-500 hover:text-red-400"
            >
              <Icon icon="mdi:plus" class="mr-2" />
              Update Address
            </a>

            <div class="pt-2 border-t">
              <div class="underline pb-1">Delivery Address</div>
              <ul class="text-xs">
                <li class="flex items-center gap-2">
                  <div>Contact name:</div>
                  <div class="font-bold">{currentAddress.name}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">{currentAddress.address}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">{currentAddress.zipcode}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">{currentAddress.city}</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">{currentAddress.country}</div>
                </li>
              </ul>
            </div>
          </div>
        {:else}
          <a
            href="/address"
            class="flex items-center text-blue-500 hover:text-red-400"
          >
            <Icon icon="mdi:plus" class="mr-2" />
            Add New Address
          </a>
        {/if}
      </div>
      <div id="Items" class="bg-white rounded-lg p-4 mt-4">
        {#each $panier as product}
          <CheckoutItem item={product} />
        {/each}
      </div>
    </div>

    <div class="md:hidden block my-4" />
    <div class="md:w-[35%]">
      <div id="PlaceOrder" class="bg-white rounded-lg p-4">
        <div class="text-2xl font-extrabold mb-2">Summary</div>

        <div class="flex items-center justify-between my-4">
          <div class="">Total Shipping</div>
          <div class="">Free</div>
        </div>

        <div class="border-t" />

        <div class="flex items-center justify-between my-4">
          <div class="font-semibold">Total</div>
          <div class="text-2xl font-semibold">
            $ <span class="font-extrabold">{total / 100}</span>
          </div>
        </div>

        <form>
          <div
            class="border border-gray-500 p-2 rounded-sm"
            id="card-element"
          />

          <p
            id="card-error"
            role="alert"
            class="text-red-700 text-center font-semibold"
          />

          <button
            class:disabled={isProcessing}
            type="submit"
            class="{isProcessing
              ? 'opacity-70'
              : 'opacity-100'} mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            {#if isProcessing}
              <Icon icon="eos-icons:loading" />
            {:else}
              <div>Place order</div>
            {/if}
          </button>
        </form>
      </div>

      <div class="bg-white rounded-lg p-4 mt-4">
        <div class="text-lg font-semibold mb-2 mt-2">AliExpress</div>
        <p class="my-2">AliExpress keeps your information and payment safe</p>
      </div>
    </div>
  </div>
</div>
