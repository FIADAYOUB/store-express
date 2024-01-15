import { json } from '@sveltejs/kit'
import {db} from '$lib/mixins/database'

export async function GET({url}) {
  const q = url.searchParams.get('q');
  const posts = await db.products.findMany(
    {
      where: {
        title: { contains: q },
    }
  }
  )
  return json(posts)
}
