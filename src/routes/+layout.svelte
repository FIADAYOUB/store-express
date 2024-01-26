<script>
	import "../app.css";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";

</script>

<div class="app bg-slate-100">
	<Header />
	<main class="mt-[250px] ">
		<slot />
	</main>
	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 110px auto 0;
		box-sizing: border-box;
	}

</style>
