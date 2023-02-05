import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { Icons } from "$src/components/general/Icon.svelte";
import { UserStatus } from "$src/components/user/UserDisplay.svelte";
import type { LayoutServerLoad } from "./$types";

let channels : App.Database.Servers.Channels.Channel[] = [
    {
        id: 0,
        server_id: -1,
        name: 'Text Channel 5',
        order: 5,
        is_voice_channel: false,
        channel_group_id: null,
    },
    {
        id: 1,
        server_id: -1,
        name: 'Text Channel 1',
        order: 1,
        is_voice_channel: false,
        channel_group_id: null,
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
        channel_group_id: null,
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

let channel_groups: App.Database.Servers.Channels.ChannelGroup[] = [
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

let users: App.Database.User[] = [
    {
        id: 1,
        username: 'obi_wan_kenobi',
        display_name: 'Obi-Wan Kenobi',
        img: '',
        status: UserStatus.Online,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: null,
        deleted_at: null,
    },
    {
        id: 2,
        username: 'general_grievous',
        display_name: 'General Grievous',
        img: '',
        status: UserStatus.Busy,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: null,
        deleted_at: null,
    },
    {
        id: 3,
        username: 'palpatine',
        display_name: 'Dart Sidious',
        img: '',
        status: UserStatus.Away,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: null,
        deleted_at: null,
    },
    {
        id: 4,
        username: 'anakin_skywalker',
        display_name: 'Anakin Skywalker',
        img: '',
        status: UserStatus.Offline,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: null,
        deleted_at: null,
    },
];

export const load = (async (data) => {
    return {
        channel_groups,
        channels,
        users,
    };
}) satisfies LayoutServerLoad;