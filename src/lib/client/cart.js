import { browser } from '$app/environment';

// methods for handling the cart
export const addToCart = (data) => {
  console.log('coucou');
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur);
		items.push(data);
		localStorage.setItem('cart', JSON.stringify(items));
	} else {
		const items = [data];
		localStorage.setItem('cart', JSON.stringify(items));
	}
};

export const clearCart = () => {
	if (!browser) return;

	localStorage.setItem('cart', JSON.stringify([]));
};

export const removeFromCart = (idx) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur);
		items.splice(idx, 1);
		localStorage.setItem('cart', JSON.stringify(items));
	}
};

export const getCart = () => {
	if (!browser) return [];

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur);
		return items;
	}

	return [];
};