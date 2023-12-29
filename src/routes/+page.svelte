<script>
  import ProductComponent from "$lib/components/ProductComponent.svelte";

	let products = [
		{ id:1, title:"Product 1", description: "This is description", url:"https://picsum.photos/id/1/800/800", price: 999},
		{ id:2, title:"Product 2", description: "This is description", url:"https://picsum.photos/id/3/800/800", price: 80},
		{ id:3, title:"Product 3", description: "This is description", url:"https://picsum.photos/id/7/800/800", price: 1000},
		{ id:4, title:"Product 4", description: "This is description", url:"https://picsum.photos/id/45/800/800", price: 699},
		{ id:5, title:"Product 5", description: "This is description", url:"https://picsum.photos/id/9/800/800", price: 779},
		{ id:6, title:"Product 6", description: "This is description", url:"https://picsum.photos/id/16/800/800", price: 879},
		{ id:7, title:"Product 7", description: "This is description", url:"https://picsum.photos/id/20/800/800", price: 59},
		{ id:8, title:"Product 8", description: "This is description", url:"https://picsum.photos/id/19/800/800", price: 44},
		{ id:9, title:"Product 9", description: "This is description", url:"https://picsum.photos/id/87/800/800", price: 345},
	];
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