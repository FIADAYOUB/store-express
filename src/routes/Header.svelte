<script>
  import Icon from "@iconify/svelte";
  import { clickOutside } from "$lib/mixins";
  import { fade, slide } from "svelte/transition";
  import logo from "$lib/images/AliExpress-logo.png";
  import { page } from "$app/stores";
  import { panier } from '$lib/store/cart';
  import debounce from 'lodash/debounce';

  let isAccountMenu = false;
  let isCartHover = false;
  let isSearching = false;
  let menuOverlay = false;
  let searchInput = '';
  let items = [];

  // $: items = searchInput ? $page?.data?.products.filter((e)=> e.title.includes(searchInput)) : [];
  $: user = $page.data?.session?.user;

  function signIn() {
    menuOverlay = false;
    isAccountMenu = false;
  }
  async function signOut() {
    isAccountMenu = false;
    const { error } = await $page.data.supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
  }

  const searchProduct = debounce(async ()=>{
    const response = await fetch(`/?q=${searchInput}`);
    items = await response.json();
  }, 500)

  function closeSearch() {
    searchInput = "";
    items = [];
  }

</script>

<div id="MainLayout" class="w-full fixed z-50">
  <div id="TopMenu" class="w-full bg-[#FAFAFA] border-b md:block hidden">
    <ul class="flex items-center justify-end text-[#333333]font-light px-2 h-10bg-[#FAFAFA] max-w-[1200px]">
      <li class="border-r border-r-gray-400 px-3 hover:text-red-600 cursor-pointer">
        Sell on AliExpress
      </li>
      <li class="border-r border-r-gray-400 px-3 hover:text-red-600 cursor-pointer">
        Cookie Preferences
      </li>
      <li class="border-r border-r-gray-400 px-3 hover:text-red-600 cursor-pointer">
        Help
      </li>
      <li class="border-r border-r-gray-400 px-3 hover:text-red-600 cursor-pointer">
        Buyer Protection
      </li>
      <li class="flex items-center gap-1 px-3 hover:text-red-600 cursor-pointer">
        <Icon icon="ic:sharp-install-mobile" />
        App
      </li>
      <li class="relative">
        <button
          on:click={()=> isAccountMenu = !isAccountMenu}
          class="{isAccountMenu
            ? "bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]"
            : "border border-[#FAFAFA]"} relative flex items-center gap-1 px-2.5 hover:text-red-600 h-full cursor-pointer"
        >
          <Icon icon="ph:user-thin" />
          Account
          <Icon icon="mdi:chevron-down"/>
        </button>
        {#if isAccountMenu}
          <div
            use:clickOutside
            on:click_outside={()=> setTimeout(()=>{isAccountMenu = false},0)}
            transition:fade
            id="AccountMenu"
            class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[100px] border-x border-b"
          >
            {#if !user}
              <div>
                <div class="text-semibold text-[15px] my-4 px-3">
                  Welcome to AliExpress!
                </div>
                <div class="flex items-center gap-1 px-3 mb-3">
                  <a
                    href="/auth"
                    class="bg-red-600 text-center w-full text-[16px] rounded-sm text-white font-semibold p-2"
                  >
                    Login / Register
                  </a>
                </div>
              </div>
            {/if}
            <div class="border-b" />
            <ul class="bg-white">
              {#if user}
                <li class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">
                  <a href="/orders">
                    My Orders
                  </a>
                </li>
                <li class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">
                  <a href="/auth/signout" class="w-full text-start">
                    Sign out
                  </a>
                </li>
              {/if}
            </ul>
          </div>
        {/if}
      </li>
    </ul>
  </div>
  <div id="MainHeader" class="flex items-center w-full bg-white">
    <div class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
      <a href="/" class="min-w-[170px] w-[170px]">
        <img src={logo} alt="logo"/>
      </a>

      <div class="max-w-[700px] w-full md:block hidden">
        <div class="relative">
          <div class="flex items-center border-2 border-red-600 rounded-md w-full">
            <input
              class=" w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
              placeholder="kitchen accessories"
              type="search"
              bind:value={searchInput}
              on:input={searchProduct}
            />
            {#if isSearching}
              <Icon
                icon="eos-icons:loading"
                class="mr-2"
              />
            {/if}
            <button class="flex items-center h-[100%] p-1.5 px-2 bg-red-600">
              <Icon icon="ph:magnifying-glass" />
            </button>
          </div>

          <div
            use:clickOutside
            on:click_outside={closeSearch}
            class="absolute bg-white max-w-[700px] max-h-60 overflow-y-scroll w-full"
          >
            {#if items?.length > 0}
              {#each items as item}
                <div class="p-1">
                  <a
                    href="/products/{item.id}"
                    class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <img class="h-10 w-10 rounded-md" src={item.url} alt="" />
                      <div class="truncate ml-2">
                        {item.title}
                      </div>
                    </div>
                    <div class="truncate">${item.price / 100}</div>
                  </a>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>

      <a href="/shoppingcart" class="flex items-center">
        <button
          class="relative md:block hidden"
          on:mouseenter={() => (isCartHover = true)}
          on:mouseleave={() => (isCartHover = false)}
        >
          <span class="absolute flex items-center justify-center -right-[3px] top-0 bg-red-600 h-[17px] min-w-[17px] text-xs text-white px-0.5 rounded-full">
            {$panier.length}
          </span>
          <div class="min-w-[40px]">
            <Icon
              icon="ph:shopping-cart-simple-light"
              class="hover:text-red-600"
            />
          </div>
        </button>
      </a>

      <button
        on:click={() => (menuOverlay = !menuOverlay)}
        type="button"
        class="md:hidden rounded-full h-8 w-8 min-w-8 flex items-center justify-center -mt-[4px] hover:bg-gray-200"
      >
        {#if !menuOverlay}
          <Icon icon="radix-icons:hamburger-menu" />
        {:else}
          <Icon icon="mdi:close" />
        {/if}
      </button>
    </div>
  </div>
</div>
{#if menuOverlay}
  <div class="h-full w-full bg-white fixed z-50 top-20" transition:slide>
    <div class="flex items-center justify-between pt-5">
      <ul class="w-full">
        <li>
          <a
            href="/orders"
            on:click={()=>menuOverlay = !menuOverlay}
            class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex items-center text-[20px] font-semibold">
              <Icon icon="ph:pen-light" />
              <span class="pl-4">My Orders</span>
            </div>
          </a>
        </li>

        <li>
          <a
            href="/shoppingcart"
            on:click={()=>menuOverlay = !menuOverlay}
            class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
          >
            <div class=" flex items-center text-[20px] font-semibold">
              <Icon icon="ph:shopping-cart-simple-light" />
              <span class="pl-4">Cart</span>
            </div>
            <div class="flex items-center justify-center bg-[#FF4646] h-[35px] min-w-[35px] text-lg text-white rounded-full">
              {$panier.length}
            </div>
          </a>
        </li>

        {#if user}
          <li class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
            <a href="/auth/signout">
              <div class=" flex items-center text-[20px] font-semibold">
                <Icon icon="ph:sign-out-light" />
                <span class="pl-4">Sign out</span>
              </div>
            </a>
          </li>
        {:else}
          <li class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
            <a href="/auth">
              <div class=" flex items-center text-[20px] font-semibold">
                <Icon icon="ph:sign-in-light" />
                <span class="pl-4">Sign in / Register</span>
              </div>
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
{/if}
