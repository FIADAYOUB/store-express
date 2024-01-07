
export const load = async ({event, locals: { sb }}) => {
	console.log("Ran layout load")

  const { data, error } = await sb.auth.getSession()
	return {
		session: data.session,
	}
}