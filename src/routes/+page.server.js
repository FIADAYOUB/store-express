import {db} from '$lib/mixins/database';

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    products : await db.products.findMany()
  }
}