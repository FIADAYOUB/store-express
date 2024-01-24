<script>
  export let item;
  const { product, quantity } = item;
</script>

<div class="flex justify-start my-2">
  <img loading="lazy" class="rounded-md w-[90px]" src={product.url} alt=""/>

  <div class="overflow-hidden pl-2">
    <div class="flex items-center">
      <span class="bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">
        Welcome Deal
      </span>
      <div class="truncate pl-2">{product.title}</div>
    </div>

    <div class="text-lg font-semibold mt-2">
      $ <span class="font-bold">{(product.price / 100).toFixed(2)}</span>
    </div>
  </div>
</div>
