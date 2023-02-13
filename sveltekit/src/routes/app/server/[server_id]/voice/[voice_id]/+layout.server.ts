import { Icons } from '$src/components/general/Icon.svelte';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		channel: {
			id: -1,
			server_id: -1,
			name: `Voice Channel ${params.voice_id}`,
			order: -1,
			is_voice_channel: false
		} as App.Database.ServerModels.Channel
	};
}) satisfies LayoutServerLoad;
