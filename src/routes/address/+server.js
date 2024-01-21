import { json } from '@sveltejs/kit'
import {db} from '$lib/mixins/database'

export async function GET({url}) {
  const userId = url.searchParams.get('userId');

  const res = await db.addresses.findFirst({
    where: { userId }
  })
  return json(res)
}
