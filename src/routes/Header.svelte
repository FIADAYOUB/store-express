<script>
  import Icon from '@iconify/svelte';

  let isAccountMenu = false;
  let isCartHover = false;
  let isSearching = false;

  let items;
</script>

<div id="MainLayout" class="w-full fixed z-50">
  <div id="TopMenu" class="w-full bg-[#FAFAFA] border-b md:block hidden">
    <ul
      class="flex items-center justify-endtext-xs text-[#333333]font-light px-2 h-10bg-[#FAFAFA] max-w-[1200px]"
    >
      <li
        class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
      >
        Sell on AliExpress
      </li>
      <li
        class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
      >
        Cookie Preferences
      </li>
      <li
        class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
      >
        Help
      </li>
      <li
        class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer"
      >
        Buyer Protection
      </li>
      <li class="px-3 hover:text-[#FF4646] cursor-pointer">
        <Icon icon="ic:sharp-install-mobile" />
        App
      </li>
      <li
        on:mouseenter={() => (isAccountMenu = true)}
        on:mouseleave={() => (isAccountMenu = false)}
        class="{isAccountMenu
          ? "bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]"
          : "border border-[#FAFAFA]"} relative flex items-center px-2.5 hover:text-[#FF4646] h-full cursor-pointer"
      >
        <Icon icon="ph:user-thin" />
        Account
        <Icon icon="mdi:chevron-down"/>
        {#if isAccountMenu}
          <div
            id="AccountMenu"
            class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[100px] border-x border-b"
          >
            <div v-if="!user">
              <div class="text-semibold text-[15px] my-4 px-3">
                Welcome to AliExpress!
              </div>
              <div class="flex items-center gap-1 px-3 mb-3">
                <a
                  href="/auth"
                  class="bg-[#FF4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2"
                >
                  Login / Register
                </a>
              </div>
            </div>
            <div class="border-b" />
            <ul class="bg-white">
              <li
                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
              >
                My Orders
              </li>
              <li
                v-if="user"
                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
              >
                Sign out
              </li>
            </ul>
          </div>
        {/if}
      </li>
    </ul>
  </div>
  <div id="MainHeader" class="flex items-center w-full bg-white">
    <div
      class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto"
    >
      <a href="/" class="min-w-[170px]">
        <img width="170" src="/AliExpress-logo.png" alt=""/>
      </a>

      <div class="max-w-[700px] w-full md:block hidden">
        <div class="relative">
          <div
            class="flex items-center border-2 border-[#FF4646] rounded-md w-full"
          >
            <input
              class=" w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
              placeholder="kitchen accessories"
              type="text"
            />
            {#if isSearching}
              <Icon
                icon="eos-icons:loading"
                class="mr-2"
              />
            {/if}
            <button class="flex items-center h-[100%] p-1.5 px-2 bg-[#FF4646]">
              <Icon icon="ph:magnifying-glass" />
            </button>
          </div>

          <div class="absolute bg-white max-w-[700px] h-auto w-full">
            {#if items?.length > 0}
              {#each items as item}
                <div class="p-1">
                  <a
                    href="/item.id"
                    class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <img class="rounded-md" width="40" src={item.url} />
                      <div class="truncate ml-2">{item.title}</div>
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
          <span
            class=" absolute flex items-center justify-center -right-[3px] top-0 bg-[#FF4646] h-[17px] min-w-[17px] text-xs text-white px-0.5 rounded-full"
          >
            {0}
          </span>
          <div class="min-w-[40px]">
            <Icon
              icon="ph:shopping-cart-simple-light"
              color={isCartHover ? '#FF4646' : ''}
            />
          </div>
        </button>
      </a>

      <button
        type="button"
        class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200"
      >
        <Icon icon="radix-icons:hamburger-menu" />
      </button>
    </div>
  </div>
</div>
