import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserStatus } from '$src/components/user/user';
import { ContentType, RoleColor } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

export const load = (async ({params, parent}) => {
	const pageData = await parent();
	const partnerId = parseInt(params.user_id);
	const partner = pageData.all_users.find((u) => u.id === partnerId);
	const messages = pageData.messages.find((m) => m[0].id === partnerId);
	return {
		current_partner: partner,
		current_messages: messages,
	};
}) satisfies LayoutServerLoad;
