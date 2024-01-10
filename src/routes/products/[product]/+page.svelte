<script>
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";

  import { addToCart } from "$lib/store/cart";

  export let data;
  $: product = data.product;

  $: currentImage = product?.url;

  $: priceComputed = product?.price ? product.price / 100 : 0;

  let isInCart = false;
  let addedProduct = false;

  $: images = [
    product?.url,
    "https://picsum.photos/id/212/800/800",
    "https://picsum.photos/id/233/800/800",
    "https://picsum.photos/id/165/800/800",
    "https://picsum.photos/id/99/800/800",
    "https://picsum.photos/id/144/800/800",
  ];

</script>

{#if product}
  <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        {#if currentImage}
          <img class="rounded-lg object-fit" src={currentImage} alt="" />
        {/if}
        {#if images[0] !== ""}
          <div class="flex items-center justify-center mt-2">
            {#each images as image}
              <!-- svelte-ignore a11y-mouse-events-have-key-events -->
              <button
                on:mouseover={() => (currentImage = image)}
                on:click={() => (currentImage = image)}
              >
                <img
                  class="w-[70px] rounded-md object-fit border-[3px] cursor-pointer
                  {currentImage === image ? 'border-[#FF5353]' : ''}"
                  src={image}
                  alt=""
                />
              </button>
            {/each}
          </div>
        {/if}
      </div>
      <div class="md:w-[60%] bg-white p-3 rounded-lg">
        <div>
          <p class="mb-2">{product.title}</p>
          <p class="font-light text-[12px] mb-2">{product.description}</p>
        </div>

        <div class="flex items-center pt-1.5">
          <div
            class="h-5 w-5 min-w-5 rounded-full bg-[#FFD000] mr-2 flex items-center justify-center"
          >
            <Icon icon="material-symbols:star-rounded" />
          </div>
          <p class="text-[#FF5353]">Extra 5% off</p>
        </div>

        <div class="flex items-center justify-start my-2">
          <Icon icon="ic:baseline-star" color="#FF5353" />
          <Icon icon="ic:baseline-star" color="#FF5353" />
          <Icon icon="ic:baseline-star" color="#FF5353" />
          <Icon icon="ic:baseline-star" color="#FF5353" />
          <Icon icon="ic:baseline-star" color="#FF5353" />
          <span class="text-[13px] font-light ml-2">
            5 213 Reviews 1,000+ orders
          </span>
        </div>

        <div class="border-b" />

        <div class="flex items-center justify-start gap-2 my-2">
          <div class="text-xl font-bold">$ {priceComputed}</div>
          <span
            class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm"
          >
            70% off
          </span>
        </div>

        <p class="text-[#009A66] text-xs font-semibold pt-1">
          Free 11-day delivery over ￡8.28
        </p>

        <p class="text-[#009A66] text-xs font-semibold pt-1">Free Shipping</p>

        <div class="py-2" />

        <button
        on:click={() => {
          addToCart(product);
          addedProduct = true;
          setTimeout(() => {
            addedProduct = false;
          }, 4000);
        }}
          class:disabled={isInCart}
          class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]"
        >
          {#if isInCart}
            <div>Is Added</div>
          {:else}
            <div>Add to Cartss</div>
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}
{#if addedProduct}
  <div transition:fade class="bg-green-600 absolute bottom-12 right-12 rounded-lg p-2">
    <h1>Added to Your Cart!</h1>
  </div>
{/if}
