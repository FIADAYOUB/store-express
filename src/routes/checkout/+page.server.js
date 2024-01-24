import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/mixins/database';

export const actions = {
	payment: async ({ cookies, request, locals: { getSession } }) => {
		// TODO
		const session = await getSession();

		if (session) {
			const data = await request.formData();
			const stripeId = data.get('stripeId');
			const name = data.get('name');
			const address = data.get('address');
			const zipcode = data.get('zipcode');
			const country = data.get('stripeId');
			const city = data.get('stripeId');
			const panier = data.get('panier');
			console.log({panier: JSON.parse(panier)});


			const order = await db.orders.create({
				data: {
					userId: session.user.id,
					stripeId,
					name,
					address,
					zipcode,
					city,
					country,
				}
			})

			JSON.parse(panier).forEach(async item => {
				await db.orderItem.create({
					data: {
						orderId: order.id,
						productId: Number(item.product.id),
					}
				})
			});

			throw redirect(301, '/success');

		}

	}
};