import { writable, get } from "svelte/store";

export const panier = writable([]);

export const addToCart = (product) => {
  let items = get(panier);
  let itemPosition = items.findIndex(
    (item) => { return item.product.id == product.id }
  )
  if (itemPosition !== -1) {
    panier.update(() => {
      let updatedItems = items.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return updatedItems;
    });
  } else {
    panier.update(() => {
      return [...items, { product, quantity: 1 }]
    });
  }
}

export const removeFromCart = (id) => {
  let items = get(panier);
  let itemPosition = items.findIndex(
    (item) => { return item.product.id == id }
  )

  items.splice(itemPosition, 1);

  panier.update(() => {
    return items
  });
}