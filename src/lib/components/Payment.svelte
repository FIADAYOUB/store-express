<script>
  import { onMount } from 'svelte';

  import { loadStripe } from '@stripe/stripe-js';

  import { PUBLIC_STRIPE_KEY } from '$env/static/public';

  let isProcessing = false;

  let paymentId = "";

  onMount(async () => {
    const stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    const elements = stripe.elements();

    const card = elements.create('card');
    const cardError = document.getElementById('card-errors');

    card.on('change', async function(event) {
      isProcessing = false;

      cardError.textContent = event.error ? event.error.message : null;

      if (event.complete) {
        const {error, token} = await stripe.createToken(card);

        if (error) {
          cardError.textContent = error.message;
        } else {
          isProcessing = true;
          paymentId = token.id;
        }
      }
    });
    card.mount('#card-element');
  });
</script>

<div class="bg-white outline outline-1 outline-gray-400 rounded-lg mt-4 px-4 py-2">
  <div id="card-element"/>
</div>
<div id="card-errors" class="m-2 text-red-600"></div>
<div class="mt-4 flex items-center justify-center">
  <slot {isProcessing}/>
</div>
<input type="text" class="hiedden" name="stripeId" bind:value={paymentId}>
