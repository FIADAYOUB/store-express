import { db } from '$lib/mixins/database';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
  const session = await event.locals.getSession();
  let orders = await db.orders.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
    include: {
      orderItem: {
        include: {
          product: true
        }
      }

    }
  })
  return {
    orders
  }
}