<script>
  import { onMount } from "svelte";
	import "../app.css";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import { invalidate } from "$app/navigation";

	export let data

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
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
