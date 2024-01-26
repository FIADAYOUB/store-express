<script>
  import visa from "$lib/images/visa.png";
  import mastercard from "$lib/images/mastercard.png";
  import paypal from "$lib/images/paypal.png";
  import applepay from "$lib/images/applepay.png";
  import cartempty from "$lib/images/cart-empty.png";
  import CartItem from "./CartItem.svelte";
	import { applyAction, deserialize } from '$app/forms';

  import  { panier } from '$lib/store/cart'
  import { formatCurrency } from "$lib/mixins";

  const cards = [visa, mastercard, paypal, applepay];

  let user;

  let totalPrice = 0;

  $: if($panier?.length) {
    totalPrice = 0;
    $panier.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    })
  }

	async function handleSubmit(event) {
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: JSON.stringify($panier)
		});

		const result = deserialize(await response.text());

		applyAction(result);
	}
</script>

<div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
  {#if !$panier.length}
    <div class="h-[500px] flex items-center justify-center">
      <div class="pt-20">
        <img loading="lazy" class="mx-auto w-[250px]" src={cartempty} alt="empty card"/>

        <div class="text-xl text-center mt-4">No items yet?</div>
        {#if !user}
          <div class="flex text-center">
            <a
              href="/auth"
              class="bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            >
              Sign in
            </a>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-2xl font-bold mb-2">
            Shopping Cart ({$panier.length})
          </div>
        </div>

        <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
          <div class="text-red-500 font-bold">
            Welcome Deal applicable on 1 item only
          </div>
        </div>

        <div id="Items" class="bg-white rounded-lg p-4 mt-4">
          {#each $panier as product}
            <CartItem item={product} />
          {/each}
        </div>
      </div>

      <div class="md:hidden block my-4" />
      <div class="md:w-[35%]">
        <div id="Summary" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              <span class="font-extrabold">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
          <a
            href="/checkout"
            class=" flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
          >
            Checkout
          </a>
        </div>
        <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2">Payment methods</div>
          <div class="flex items-center justify-start gap-8 my-4">
            {#each cards as card}
              <img loading="lazy" class="h-6" src={card} alt="payment" />
            {/each}
          </div>

          <div class="border-b" />

          <div class="text-lg font-semibold mb-2 mt-2">Buyer Protection</div>
          <p class="my-2">
            Get full refund if the item is not as described or if is not
            delivered
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
