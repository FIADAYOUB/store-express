import { stripe } from '$lib/mixins/stripe';

export const load = async ({ locals: { getSession }, cookies }) => {


	const session = await getSession();
	if (session) {
		// create the customer
		const customer = await stripe.customers.create({
		 email: session.user.email,
		 name: session.user.name
	 })

	 // set a cookie
	 cookies.set('customerId', customer.id,  { path: '/' })
	 return {
		 session
	 };
	}
};