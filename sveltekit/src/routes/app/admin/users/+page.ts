import { UserResource } from '$src/lib/api';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async () => {
	try {
		const users = await UserResource.all();
		return {
			users
		};
	} catch (err: App.API.RequestError) {
		// TODO handle any -> types for error page
		throw error(404, err);
	}
}) satisfies PageLoad;
