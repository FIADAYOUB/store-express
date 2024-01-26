<script>
  import Icon from "@iconify/svelte";
  import CheckoutItem from "./CheckoutItem.svelte";
  import { panier } from "$lib/store/cart";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Payment from "$lib/components/Payment.svelte";
  import { formatCurrency } from "$lib/mixins";

  let currentAddress = {
    name: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
  };
  let isProcessing = false;

  $: currectUser = $page.data?.session?.user;

  // data from server
  export let data;

  onMount(async () => {
    if (currectUser) {
      const response = await fetch(`/address/?userId=${currectUser.id}`);
      currentAddress = await response.json();
    }
  });

  let totalPrice = 0;

  $: if ($panier?.length) {
    totalPrice = 0;
    $panier.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
  }

</script>

<div id="CheckoutPage" class="mt-4 max-w-[1200px] w-full mx-auto px-2">
  <div class="md:flex gap-4 justify-between w-full ">
    <div class="md:w-1/2">
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
    <div class="md:w-1/2">
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
            <span class="font-extrabold">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <form
          action="?/payment"
          method="post"
          class="antialiased"
        >
          <Payment let:isProcessing>
            <button
              class:disabled={!isProcessing}
              type="submit"
              class="{!isProcessing
                ? 'opacity-70'
                : 'opacity-100'} mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
            >
              {#if !isProcessing}
                <Icon icon="eos-icons:loading" />
              {:else}
                <div>Place order</div>
              {/if}
            </button>
          </Payment>

            <input
              name="name"
              type="text"
              class="hidden"
              bind:value={currentAddress.name}
            />
            <input
              name="address"
              type="text"
              class="hidden"
              bind:value={currentAddress.address}
            />

            <input
              name="zipcode"
              type="text"
              class="hidden"
              bind:value={currentAddress.zipcode}
            />

            <input
              name="city"
              type="text"
              class="hidden"
              bind:value={currentAddress.city}
            />

            <input
              name="country"
              type="text"
              class="hidden"
              bind:value={currentAddress.country}
            />

            <input
              name="panier"
              type="text"
              value={JSON.stringify($panier)}
              class="hidden"
            >
      </div>

      <div class="bg-white rounded-lg p-4 mt-4">
        <div class="text-lg font-semibold mb-2 mt-2">AliExpress</div>
        <p class="my-2">AliExpress keeps your information and payment safe</p>
      </div>
    </div>
  </div>
</div>
