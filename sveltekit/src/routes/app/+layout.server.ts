import { getStores } from "$app/stores";
import { Icons } from "$src/components/general/Icon.svelte";
import { UserStatus } from "$src/components/user/UserDisplay.svelte";
import type { LayoutServerLoad } from "./$types";

const servers: App.Database.ServerModels.Server[] = [
    {
        id: 1,
        name: 'Server 1',
        unread: 1,
        text_channel_id: 1,
        channels: [],
    },
    {
        id: 2,
        name: 'Server 2',
        unread: 1,
        text_channel_id: 1,
        channels: [],
    },
];

export const load = (async ({ params }) => {
    return {
        user: {
            id: 1,
            username: 'redesiigner',
            display_name: 'Patrick Hellebrand',
            img: '',
            status: UserStatus.Busy,
        } as App.Database.User,
        servers,
    };
}) satisfies LayoutServerLoad;