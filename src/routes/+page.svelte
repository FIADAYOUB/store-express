<script>
  import ProductComponent from "$lib/components/ProductComponent.svelte";

	let products = [];
</script>
<div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
	<div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
		{#if products?.length > 0}
			{#each products as product}
				<ProductComponent {product} />
			{/each}
		{/if}
	</div>
</div>