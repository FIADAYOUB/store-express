<script>
  import { onMount } from 'svelte';

  import { loadStripe } from '@stripe/stripe-js';

  let valide = false;

  let paymentToken = "";

  onMount(async () => {
    const stripe = await loadStripe('pk_test_51OarTJJAOjTCLtika2uL9jPFXFx7EcDqKeA1whUuoT6xeDEpDxjBP51vIQonvRnyGZY4HxEerXM2WEVi0xi8Jmgh00ESH3j3CX');
    const elements = stripe.elements();

    const card = elements.create('card');
    const cardError = document.getElementById('card-errors');

    card.on('change', async function(event) {
      valide = false;

      cardError.textContent = event.error ? event.error.message : null;

      if (event.complete) {
        const {token, error} = await stripe.createToken(card);

        if (error) {
          cardError.textContent = error.message;
        } else {
          valide = true;
          paymentToken = token.id;
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
  <slot {valide}/>
</div>
