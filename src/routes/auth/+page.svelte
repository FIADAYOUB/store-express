<script>
  import logo from "$lib/images/AliExpress-logo.png";
  import google from "$lib/images/google-logo.png";
  import github from "$lib/images/github-logo.png";

  export let data;
	let { supabase } = data;

	async function login(value) {
		await supabase.auth.signInWithOAuth({
			provider: value,
			options: {
				redirectTo: 'http://localhost:5173/'
			}
		});
	}
</script>
<div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
        <a href="/" class="min-w-[170px]">
            <img width="170" src={logo} alt="logo">
        </a>
    </div>

    <div class="max-w-[400px] mx-auto px-2">

        <div class="text-center my-6">Login / Register</div>

        <button
          on:click={()=>login('google')}
          class=" flex  items-center  justify-center  gap-3 p-1.5 w-full  border  hover:bg-gray-100 rounded-full text-lg font-semibold"
        >
            <img class="w-full max-w-[30px]" src={google} alt="">
            <div>Google</div>
        </button>

        <button
          on:click={()=> login('github')}
          class="mt-4 flex  items-center  justify-center  gap-3 p-1.5 w-full  border  hover:bg-gray-100 rounded-full text-lg font-semibold"
        >
            <img class="w-full max-w-[30px]" src={github} alt="">
            <div>Github</div>
        </button>

    </div>
</div>
