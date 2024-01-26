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
			const country = data.get('country');
			const city = data.get('city');
			const panier = data.get('panier');


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
						quantity: item.quantity,
					}
				})
			});

			throw redirect(301, '/success');

		}

	}
};