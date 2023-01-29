import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { Icons } from "$src/components/general/Icon.svelte";
import { UserStatus } from "$src/components/user/UserDisplay.svelte";
import type { LayoutServerLoad } from "./$types";

let channels : App.Database.ServerModels.Channel[] = [
    {
        id: 0,
        server_id: -1,
        name: 'Text Channel 5',
        order: 5,
        is_voice_channel: false,
        channel_group_id: undefined,
    },
    {
        id: 1,
        server_id: -1,
        name: 'Text Channel 1',
        order: 1,
        is_voice_channel: false,
        channel_group_id: undefined,
    },
    {
        id: 2,
        server_id: -1,
        name: 'Text Channel 2.1',
        order: 1,
        is_voice_channel: false,
        channel_group_id: 1,
    },
    {
        id: 3,
        server_id: -1,
        name: 'Text Channel 4.1',
        order: 1,
        is_voice_channel: false,
        channel_group_id: 2,
    },
    {
        id: 1,
        server_id: -1,
        name: 'Voice Channel 3',
        order: 3,
        is_voice_channel: true,
        channel_group_id: undefined,
    },
    {
        id: 2,
        server_id: -1,
        name: 'Voice Channel 2.2',
        order: 2,
        is_voice_channel: true,
        channel_group_id: 1,
    },
    {
        id: 3,
        server_id: -1,
        name: 'Voice Channel 4.2',
        order: 2,
        is_voice_channel: true,
        channel_group_id: 2,
    },
];

let channel_groups: App.Database.ServerModels.ChannelGroup[] = [
    {
        id: 1,
        name: 'Group 2.X',
        order: 2,
        _channels: [],
    },
    {
        id: 2,
        name: 'Group 4.X',
        order: 4,
        _channels: [],
    }
];

let users_online: App.Database.User[] = [
    {
        id: 1,
        username: 'user_1',
        display_name: 'User 1',
        img: '',
        status: UserStatus.Online,
    },
    {
        id: 2,
        username: 'user2',
        display_name: 'User 2',
        img: '',
        status: UserStatus.Busy,
    },
    {
        id: 3,
        username: 'user3',
        display_name: 'User 3',
        img: '',
        status: UserStatus.Away,
    },
    {
        id: 4,
        username: 'user4',
        display_name: 'User 4',
        img: '',
        status: UserStatus.Offline,
    },
];

export const load = (async (data) => {
    return {
        channel_groups,
        channels,
        users_online,
    };
}) satisfies LayoutServerLoad;