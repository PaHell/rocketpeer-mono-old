import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { RoleColor, UserStatus } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

let all_users: App.Database.User[] = [
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
	},
	{
		id: 5,
		username: 'boba_fett',
		display_name: 'Boba Fett',
		img: '',
		status: UserStatus.Online,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 6,
		username: 'yoda',
		display_name: 'Master Yoda',
		img: '',
		status: UserStatus.Away,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 7,
		username: 'jar_jar_binks',
		display_name: 'Jar Jar Binks',
		img: '',
		status: UserStatus.Busy,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 8,
		username: 'ashoka_tano',
		display_name: 'Ashoka Tano',
		img: '',
		status: UserStatus.Offline,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 9,
		username: 'darth_maul',
		display_name: 'Darth Maul',
		img: '',
		status: UserStatus.Online,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 10,
		username: 'darth_vader',
		display_name: 'Darth Vader',
		img: '',
		status: UserStatus.Busy,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 11,
		username: 'darth_sidious',
		display_name: 'Darth Sidious',
		img: '',
		status: UserStatus.Away,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 12,
		username: 'darth_maul',
		display_name: 'Darth Maul',
		img: '',
		status: UserStatus.Offline,
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
];

let server_users: App.Database.Servers.ServerUser[] = [
	{
		server_id: 1,
		user_id: 1,
		display_name: 'Obi-Wan Kenobi',
	},
	{
		server_id: 1,
		user_id: 2,
		display_name: 'Luke Skywalker',
	},
	{
		server_id: 1,
		user_id: 3,
		display_name: 'Darth Vader',
	},
	{
		server_id: 1,
		user_id: 4,
		display_name: 'Han Solo',
	},
	{
		server_id: 1,
		user_id: 5,
		display_name: 'Chewbacca',
	},
	{
		server_id: 1,
		user_id: 6,
		display_name: 'Leia Organa',
	},
	{
		server_id: 1,
		user_id: 7,
		display_name: 'C-3PO',
	},
	{
		server_id: 1,
		user_id: 8,
		display_name: 'R2-D2',
	},
	{
		server_id: 1,
		user_id: 9,
		display_name: 'Darth Sidious',
	},
];

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
		is_live: false,
		is_talking: true,
	},
	{
		id: 4,
		user_id: 4,
		channel_id: 2,
		is_live: false,
		is_talking: false,
	},
	{
		id: 5,
		user_id: 5,
		channel_id: 2,
		is_live: false,
		is_talking: true,
	},
	{
		id: 6,
		user_id: 6,
		channel_id: 2,
		is_live: false,
		is_talking: false,
	},	
	{
		id: 7,
		user_id: 3,
		channel_id: 2,
		is_live: true,
		is_talking: false,
	},
	{
		id: 8,
		user_id: 4,
		channel_id: 2,
		is_live: true,
		is_talking: true,
	}
];

let roles: App.Database.Servers.ServerRole[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Admin',
		color: RoleColor.Blue,
		order: 1,
	},
	{
		id: 2,
		server_id: -1,
		name: 'Moderator',
		color: RoleColor.Purple,
		order: 2,
	},
	{
		id: 3,
		server_id: -1,
		name: 'Member',
		color: RoleColor.Green,
		order: 3,
	},
];

let rolesUsers : App.Database.Servers.ServerRoleUser[] = [
	{
		server_role_id: 1,
		server_user_id: 1,
	},
	{
		server_role_id: 2,
		server_user_id: 2,
	},
	{
		server_role_id: 3,
		server_user_id: 3,
	},
	{
		server_role_id: 3,
		server_user_id: 4,
	},
	{
		server_role_id: 3,
		server_user_id: 5,
	},
];

export const load = (async (data) => {
	return {
		all_users,
		server_users,
		channel_groups,
		text_channels,
		voice_channels,
		voice_channel_users,
		roles,
		rolesUsers,
	};
}) satisfies LayoutServerLoad;
