<script>
  import Icon from "@iconify/svelte";
  import { addToCart, removeFromCart } from '$lib/store/cart'
  import QauntityControl from "$lib/components/QauntityControl.svelte";
  import { formatCurrency } from "$lib/mixins";

  export let item;

  const { product, quantity } = item;

  function handleChange (event) {
    if (event.detail.isAdd) {
      addToCart(product)
    } else {
      removeFromCart(product.id)
    }
  }
</script>

<div class="flex justify-start my-2">

  <img loading="lazy" class="rounded-md md:w-[150px] w-[90px]" src={product.url} alt={product.title}/>

  <div class="overflow-hidden pl-2 w-full">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center justify-between truncate">
        <span
          class="sm:block hidden bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]"
          >Welcome Deal</span
        >
        <div class="truncate sm:pl-2">{product.title}</div>
      </div>
      <button
        on:click={removeFromCart}
        class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
      >
        <Icon icon="material-symbols:delete-outline" />
      </button>
    </div>
    <div class="text-xl font-semibold">
      <span class="font-bold">{formatCurrency(product.price)}</span>
    </div>
    <p class="text-[#009A66] text-xs font-semibold pt-1">
      Free 11-day delivery over {formatCurrency(828)}
    </p>
    <p class="text-[#009A66] text-xs font-semibold pt-1">Free Shipping</p>
    <div class="flex items-center justify-end">
      <button
        on:click={removeFromCart}
        class="sm:hidden block -mt-0.5 hover:text-red-500"
      >
        <Icon icon="material-symbols:delete-outline" />
      </button>
    </div>
    <QauntityControl qte={quantity} on:change={handleChange}/>
  </div>
</div>
