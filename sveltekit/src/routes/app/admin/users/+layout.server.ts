import { getStores } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserResource } from '$src/lib/api';
import { UserStatus, ServerRole } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, url }) => {
	return {
		users: await UserResource.all(),
	};
}) satisfies LayoutServerLoad;
