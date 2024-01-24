<script>
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  export let data;

  $: orders = data.orders;
  let user;
</script>

<div id="OrdersPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
  <div class="bg-white w-full p-6 min-h-[150px]">
    <div class="flex items-center text-xl">
      <Icon icon="carbon:delivery" color="#5FCB04" />
      <span class="pl-4">Orders</span>
    </div>
    {#if orders?.length}
      {#each orders as order}
        <div class="text-sm pl-[50px]">
          <div class="border-b py-1">
            <p>Stripe ID: {order.stripeId}</p>
            <div class="pt-2"></div>
            <div>
              {#each order.orderItem as item}
                <a
                  class="flex items-center gap-3 p-1 hover:underline hover:text-blue-500"
                  href={`/products/${item.productId}`}
                >
                  <img loading="lazy" class="w-20 rounded-lg" src={item.product.url} alt={item.product.title} />
                  {item.product.title}
                </a>
              {/each}
            </div>
            <div class="pt-2 pb-5">
              Delivery Address:  {order.address}, {order.zipcode}, {order.city},
              {order.country}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div class="flex items-center justify-center">
        You have no order history
      </div>
    {/if}
  </div>
</div>
