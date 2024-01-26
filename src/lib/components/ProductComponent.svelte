<script>
  import { formatCurrency } from '$lib/mixins';
  import Icon from '@iconify/svelte';

  export let product;

  let price = product.price;
  let oldPrice = ((product.price + (product.price / 20)));

</script>
<div
  id={`ProductComponent${product.id}`}
  class="outline outline-1 outline-gray-300 bg-white inline-block rounded hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer"
>
    <a href={`/products/${product.id}`}>
      <img
        class="rounded-t "
        src={product.url}
        alt=""
      >
        <div id="ProductDetails">
            <span class="flex items-center justify-start gap-3 px-1 pt-1">
                <span class="text-[#FF6674] font-semibold">{ formatCurrency(price) }</span>
                <span class="text-gray-500 text-sm text-light line-through">{ formatCurrency(oldPrice) }</span>
            </span>
            <span class="px-1 relative -top-1.5 text-[#FF6674] text-xs font-semibold">
                Extra 5% off
            </span>
            <div class="flex items-center gap-1 px-1 relative -top-1">
                <span class="bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm">Welcome Deal</span>
                <span class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm">Top Selling</span>
            </div>

            <p class="flex items-center px-1 pt-0.5 text-xs text-[#252525]">
                5,000+ sold
                <Icon icon="material-symbols:star-rate" color="#757575" class="ml-1.5"/> 4.7
            </p>

            <p class="px-1 pt-0.5 text-xs text-[#252525]">
                { product.title.substring(0,60) }
            </p>

            <p class="px-1 pb-1">
                <span class="text-[#009A66] text-xs font-semibold">Free Shipping</span>
            </p>

        </div>
    </a>
</div>

