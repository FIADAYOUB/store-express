import {db} from '$lib/mixins/database';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	updateAdress: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(301, '/auth');
		}

		// call the open AI endpoint and generate the image
		const formData = await event.request.formData();
		const name = formData.get('name');
		const address = formData.get('address');
		const zipcode = formData.get('zipcode');
		const city = formData.get('city');
		const country = formData.get('country');

    const res = await db.addresses.create({
      data: {
          userId: session.user.id,
          name,
          address,
          zipcode,
          city,
          country
      }
    })

		throw redirect(300, `/checkout`);
	}
};