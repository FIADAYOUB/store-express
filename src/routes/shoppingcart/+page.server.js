import { stripe } from '$lib/mixins/stripe';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json());

		const session = await event.locals.getSession();
		const user = session.user;

		// TODO
    const customerId = user ? user.stripe_customer_id ?? undefined : undefined;

		const stripeSession = await stripe.checkout.sessions.create({
			line_items: [
			{
        price: "price_1Ob93YJAOjTCLtikqcH48vjT",//TODO
        quantity: 1
      }
      ],
      mode: 'subscription',
			success_url: `${event.url.origin}/success`,
			cancel_url: `${event.url.origin}/cancel`,
		});

		if (stripeSession.url) {
			redirect(307, stripeSession.url);
		}

		// TODO: make these errors not suck
		error(500);
	}
};