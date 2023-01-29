import { Icons } from "$src/components/general/Icon.svelte";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ params }) => {
    return {
        channel: {
            title: `Voice Channel ${params.voice_id}`,
            icon: Icons.VoiceChannel,
            path: `/app/server/${params.server_id}/voice/${params.voice_id}}`
        }
    };
}) satisfies LayoutServerLoad;