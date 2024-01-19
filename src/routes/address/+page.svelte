<script>
  import Icon from '@iconify/svelte';
  import {page} from '$app/stores';
  import { enhance } from '$app/forms';
  import { useForm, Hint, validators, required } from "svelte-use-form";

  /** @type {import('./$types').ActionData} */
  export let form;

  const formulaire = useForm();

  $: contactNameRules =
    $formulaire.contactName?.touched && $formulaire.contactName?.errors.required;
  $:console.log({contactNameRules});

  let isLoading = false;

</script>

<div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
  <div class="mx-auto bg-white rounded-lg p-3">
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
          name="contactName"
          type="text"
        />
        <label
          for="contactName"
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
        <Hint for="contactName" on="required" let:value>
          <span class="text-red-600 text-xs ml-3">
            {value} *
          </span>
        </Hint>
      </div>

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="Address"
        name="address"
        type="text"
      />

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="Zip Code"
        name="zipcode"
        type="text"
      />

      <input
        class="w-full mt-2 outline outline-1 rounded-lg py-2 px-3"
        placeholder="City"
        name="city"
        type="text"
      />

      <input
        class="w-full mt-2  outline outline-1 rounded-lg py-2 px-3"
        placeholder="Country"
        name="country"
        type="text"
      />

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

