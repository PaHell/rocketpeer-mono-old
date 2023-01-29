import { Icons } from "$src/components/general/Icon.svelte";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ params }) => {
    return {
        channel : {
            title: `Text Channel ${params.text_id}`,
            icon: Icons.TextChannel,
            path: `/app/server/${params.server_id}/text/${params.text_id}}`
        }
    };
}) satisfies LayoutServerLoad;