import { getStores } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserResource } from '$src/lib/api';
import { UserStatus, ServerRole } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params, url }) => {
	try {
		const users = await UserResource.all();
		return {
			users,
		}
	} catch (err: App.API.RequestError) {
		// TODO handle any -> types for error page
		throw error(404, err);
	}
}) satisfies LayoutServerLoad;
