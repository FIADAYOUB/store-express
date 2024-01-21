import { stripe } from '$lib/mixins/stripe';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json());

		const user = event.locals.user;
    console.log("-----------------------------------------------------------------------");
    console.log({user});

		const customerId = user ? user.stripe_customer_id ?? undefined : undefined;

		const session = await stripe.checkout.sessions.create({
			shipping_address_collection: {
				allowed_countries: ['US']
			},
			line_items: [
			{
        price: "price_1OAGYBDVy0rtNA6WZ7fSwK2d",
        quantity: 2
      }
      ],
			customer: customerId,
			mode: 'payment',
			success_url: `${event.url.origin}/success`,
			cancel_url: `${event.url.origin}/cancel`,
			automatic_tax: { enabled: true },
			billing_address_collection: 'required'
		});

		if (session.url) {
			redirect(307, session.url);
		}

		// TODO: make these errors not suck
		error(500);
	}
};