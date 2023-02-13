import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserStatus } from '$src/components/user/user';
import type { LayoutServerLoad } from './$types';

let text_channels: App.Database.Servers.Channels.TextChannel[] = [
	{
		id: 0,
		server_id: -1,
		name: 'Text Channel 5',
		order: 5,
		channel_group_id: null
	},
	{
		id: 1,
		server_id: -1,
		name: 'Text Channel 1',
		order: 1,
		channel_group_id: null
	},
	{
		id: 2,
		server_id: -1,
		name: 'Text Channel 2.1',
		order: 1,
		channel_group_id: 1
	},
	{
		id: 3,
		server_id: -1,
		name: 'Text Channel 4.1',
		order: 1,
		channel_group_id: 2
	},
];

let voice_channels: App.Database.Servers.Channels.VoiceChannel[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Voice Channel 3',
		order: 3,
		channel_group_id: null,
	},
	{
		id: 2,
		server_id: -1,
		name: 'Voice Channel 2.2',
		order: 2,
		channel_group_id: 1
	},
	{
		id: 3,
		server_id: -1,
		name: 'Voice Channel 4.2',
		order: 2,
		channel_group_id: 2
	}
];

let channel_groups: App.Database.Servers.Channels.ChannelGroup[] = [
	{
		id: 1,
		name: 'Group 2.X',
		order: 2,
	},
	{
		id: 2,
		name: 'Group 4.X',
		order: 4,
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
		deleted_at: null
	},
	{
		id: 2,
		username: 'general_grievous',
		display_name: 'General Grievous',
		img: '',
		status: UserStatus.Busy,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 3,
		username: 'palpatine',
		display_name: 'Dart Sidious',
		img: '',
		status: UserStatus.Away,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 4,
		username: 'anakin_skywalker',
		display_name: 'Anakin Skywalker',
		img: '',
		status: UserStatus.Offline,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	}
];

let voice_channel_users: App.Database.Servers.Channels.VoiceChannelUser[] = [
	{
		id: 1,
		user_id: 1,
		channel_id: 1,
		is_live: false,
		is_talking: true,
	},
	{
		id: 2,
		user_id: 2,
		channel_id: 1,
		is_live: false,
		is_talking: false,
	},
	{
		id: 3,
		user_id: 3,
		channel_id: 2,
		is_live: true,
		is_talking: false,
	},
	{
		id: 4,
		user_id: 4,
		channel_id: 2,
		is_live: true,
		is_talking: true,
	}
];		

export const load = (async (data) => {
	return {
		channel_groups,
		text_channels,
		voice_channels,
		users,
		voice_channel_users,
	};
}) satisfies LayoutServerLoad;
