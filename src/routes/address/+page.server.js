import db from '$lib/mixins/database.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	updateAdress: async (event) => {
		const session = await event.locals.getSession();
    console.log({session});
		if (!session) {
			throw redirect(301, '/auth');
		}

		// call the open AI endpoint and generate the image
		const formData = await event.request.formData();
		const name = formData.get('name');
		const adress = formData.get('adress');
		const zipCode = formData.get('zipCode');
		const city = formData.get('city');
		const country = formData.get('country');

    const res = await prisma.addresses.create({
      data: {
          name,
          adress,
          zipCode,
          city,
          country
      }
    })

		throw redirect(300, `/checkout`);
	}
};