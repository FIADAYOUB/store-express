import {db} from '$lib/mixins/database';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
  let product = await db.products.findFirst({
    where: { id: Number(params.product) }
  })
  return {
    product
  }
}