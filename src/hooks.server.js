import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js'
export const handle = async ({ event, resolve }) => {
	const supabaseServer = createClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
    event
	);

	event.locals.sb = supabaseServer;

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await supabaseServer.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};