<script>
  import Icon from '@iconify/svelte';
  import {page} from '$app/stores';
  import { enhance } from '$app/forms';
  import { useForm, Hint, validators, required } from "svelte-use-form";

  /** @type {import('./$types').ActionData} */
  export let form;

  const formulaire = useForm();

  $: contactNameRules = $formulaire.contactName?.touched && $formulaire.contactName?.errors.required;
  $: addressRules = $formulaire.address?.touched && $formulaire.address?.errors.required;
  $: zipcodeRules = $formulaire.zipcode?.touched && $formulaire.zipcode?.errors.required;
  $: cityRules = $formulaire.city?.touched && $formulaire.city?.errors.required;
  $: countryRules = $formulaire.country?.touched && $formulaire.country?.errors.required;

  let isLoading = false;

</script>

<div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
  <div class="mx-auto bg-white rounded-lg p-3 min-w-[350px]">
    <div class="text-xl text-bold mb-2">Address Details</div>
    <form
      action="?/updateAdress"
      method="POST"
      use:enhance={() => {
        isLoading = true;
      }}
      use:formulaire
    >
      {#if form?.credentials || form?.invalid}
        <div
          class="rounded-lg mt-4 text-red-600 w-full flex items-center justify-start mx-auto p-4 outline outline-1 outline-red-600"
        >
          <div class="mx-2">There was a problem</div>
        </div>
      {/if}
      <div class="w-full mt-6 text-lg relative">
        <input
          use:validators={[required]}
          class="w-full rounded-md py-1 px-3 outline {contactNameRules
            ? 'outline-2 outline-red-600'
            : 'outline-1 outline-gray-300'} peer"
          placeholder=""
          name="name"
          type="text"
        />
        <label
          for="name"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transformulaire -translate-y-4
          scale-75 top-2 origin-[0] left-4 bg-white
          {contactNameRules
            ? 'peer-placeholder-shown:-translate-y-1/3 peer-placeholder-shown:top-4'
            : 'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
          peer-placeholder-shown:scale-100
          peer-focus:scale-75 left-1 peer-focus:top-1 peer-focus:-translate-y-4"
        >
          Contact name
        </label>
        <Hint for="name" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>
      <div class="w-full mt-6 text-lg relative">
        <input
          use:validators={[required]}
          class="w-full rounded-md py-1 px-3 outline {addressRules
            ? 'outline-2 outline-red-600'
            : 'outline-1 outline-gray-300'} peer"
          placeholder=""
          name="address"
          type="text"
        />
        <label
          for="address"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transformulaire -translate-y-4
          scale-75 top-2 origin-[0] left-4 bg-white
          {addressRules
            ? 'peer-placeholder-shown:-translate-y-1/3 peer-placeholder-shown:top-4'
            : 'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
          peer-placeholder-shown:scale-100
          peer-focus:scale-75 left-1 peer-focus:top-1 peer-focus:-translate-y-4"
        >
          Address
        </label>
        <Hint for="address" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>

      <div class="w-full mt-6 text-lg relative">
        <input
          use:validators={[required]}
          class="w-full rounded-md py-1 px-3 outline {zipcodeRules
            ? 'outline-2 outline-red-600'
            : 'outline-1 outline-gray-300'} peer"
          placeholder=""
          name="zipcode"
          type="text"
        />
        <label
          for="zipcode"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transformulaire -translate-y-4
          scale-75 top-2 origin-[0] left-4 bg-white
          {zipcodeRules
            ? 'peer-placeholder-shown:-translate-y-1/3 peer-placeholder-shown:top-4'
            : 'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
          peer-placeholder-shown:scale-100
          peer-focus:scale-75 left-1 peer-focus:top-1 peer-focus:-translate-y-4"
        >
          Zip Code
        </label>
        <Hint for="zipcode" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>

      <div class="w-full mt-6 text-lg relative">
        <input
          use:validators={[required]}
          class="w-full rounded-md py-1 px-3 outline {cityRules
            ? 'outline-2 outline-red-600'
            : 'outline-1 outline-gray-300'} peer"
          placeholder=""
          name="city"
          type="text"
        />
        <label
          for="city"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transformulaire -translate-y-4
          scale-75 top-2 origin-[0] left-4 bg-white
          {cityRules
            ? 'peer-placeholder-shown:-translate-y-1/3 peer-placeholder-shown:top-4'
            : 'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
          peer-placeholder-shown:scale-100
          peer-focus:scale-75 left-1 peer-focus:top-1 peer-focus:-translate-y-4"
        >
          City
        </label>
        <Hint for="city" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>

      <div class="w-full mt-6 text-lg relative">
        <input
          use:validators={[required]}
          class="w-full rounded-md py-1 px-3 outline {countryRules
            ? 'outline-2 outline-red-600'
            : 'outline-1 outline-gray-300'} peer"
          placeholder=""
          name="country"
          type="text"
        />
        <label
          for="country"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transformulaire -translate-y-4
          scale-75 top-2 origin-[0] left-4 bg-white
          {countryRules
            ? 'peer-placeholder-shown:-translate-y-1/3 peer-placeholder-shown:top-4'
            : 'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2'}
          peer-placeholder-shown:scale-100
          peer-focus:scale-75 left-1 peer-focus:top-1 peer-focus:-translate-y-4"
        >
          Country
        </label>
        <Hint for="country" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>
      <button
        type="submit"
        class=" mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
      >
      {#if !isLoading}
        <div>Update Address</div>
      {:else}
        <Icon
          icon="eos-icons:loading"
          class="mr-2"
        />
      {/if}
      </button>
    </form>
  </div>
</div>

