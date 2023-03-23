import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { ServerTagColor, UserStatus, ServerRole } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

let users_on_server: App.DB.User[] = [
	{
		id: 1,
		username: 'obi_wan_kenobi',
		display_name: 'Obi-Wan Kenobi',
		first_name: 'Obi-Wan',
		last_name: 'Kenobi',
		image: null,
		status: UserStatus.Online,
		email: 'obiwan@gmx.de',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 2,
		username: 'general_grievous',
		display_name: 'General Grievous',
		first_name: 'General',
		last_name: 'Grievous',
		image: null,
		status: UserStatus.Busy,
		email: 'gg@gmail.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 3,
		username: 'palpatine',
		display_name: 'Dart Sidious',
		first_name: 'Darth',
		last_name: 'Sidious',
		image: null,
		status: UserStatus.Away,
		email: 'palpatine@outlook.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 4,
		username: 'anakin_skywalker',
		display_name: 'Darth Vader',
		first_name: 'Darth',
		last_name: 'Vader',
		image: '',
		status: UserStatus.Offline,
		email: 'anakin@sky.de',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 5,
		username: 'boba_fett',
		display_name: 'Boba Fett',
		first_name: 'Boba',
		last_name: 'Fett',
		image: '',
		status: UserStatus.Online,
		email: 'boba@tatooine.global',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 6,
		username: 'yoda',
		display_name: 'Master Yoda',
		first_name: 'Master',
		last_name: 'Yoda',
		image: '',
		status: UserStatus.Away,
		email: 'yoda@dagobaah.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 7,
		username: 'jar_jar_binks',
		display_name: 'Jar Jar Binks',
		first_name: 'Jar Jar',
		last_name: 'Binks',
		image: '',
		status: UserStatus.Busy,
		email: 'jarjar@bing.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 8,
		username: 'ashoka_tano',
		display_name: 'Ashoka Tano',
		first_name: 'Ashoka',
		last_name: 'Tano',
		image: '',
		status: UserStatus.Offline,
		email: 'ashoka@icloud.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 9,
		username: 'darth_maul',
		display_name: 'Darth Maul',
		first_name: 'Darth',
		last_name: 'Maul',
		image: '',
		status: UserStatus.Online,
		email: 'darth@corruscant.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 10,
		username: 'jabba_the_hutt',
		display_name: 'Jabba the Hutt',
		first_name: 'Jabba',
		last_name: 'the Hutt',
		image: '',
		status: UserStatus.Online,
		email: 'jabba@tatooine.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 11,
		username: 'grogu',
		display_name: 'Grogu',
		first_name: 'Grogu',
		last_name: '',
		image: '',
		status: UserStatus.Online,
		email: '',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 12,
		username: 'the_mandalorian',
		display_name: 'The Mandalorian',
		first_name: 'Din',
		last_name: 'Djarin',
		image: '',
		status: UserStatus.Online,
		email: '',
		created_at: '2021-01-01T00:00:00.000Z',
	},
];

let server_users: App.DB.UserServer[] = [
	{
		id: 1,
		server_id: -1,
		user_id: 1,
		display_name: 'Ben',
		role: ServerRole.Owner,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 2,
		server_id: -1,
		user_id: 2,
		display_name: 'The General',
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 3,
		server_id: -1,
		user_id: 3,
		display_name: 'The Sennator',
		role: ServerRole.Moderator,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 4,
		server_id: -1,
		user_id: 4,
		display_name: 'Darth Vader',
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 5,
		server_id: -1,
		user_id: 5,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 6,
		server_id: -1,
		user_id: 6,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 7,
		server_id: -1,
		user_id: 7,
		display_name: null,
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 8,
		server_id: -1,
		user_id: 8,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 9,
		server_id: -1,
		user_id: 9,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 10,
		server_id: -1,
		user_id: 10,
		display_name: null,
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 11,
		server_id: -1,
		user_id: 11,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 12,
		server_id: -1,
		user_id: 12,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
];

let text_channels: App.DB.TextChannel[] = [
	{
		id: 0,
		server_id: -1,
		name: 'Text Channel 5',
		order: 5,
		channel_group_id: null,
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

let voice_channels: App.DB.VoiceChannel[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Voice Channel 3',
		order: 3,
		channel_group_id: null,
		max_users: 10,
	},
	{
		id: 2,
		server_id: -1,
		name: 'Voice Channel 2.2',
		order: 2,
		channel_group_id: 1,
		max_users: 2,
	},
	{
		id: 3,
		server_id: -1,
		name: 'Voice Channel 4.2',
		order: 2,
		channel_group_id: 2,
		max_users: null,
	}
];

let channel_groups: App.DB.ChannelGroup[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Group 2.X',
		order: 2,
	},
	{
		id: 2,
		server_id: -1,
		name: 'Group 4.X',
		order: 4,
	}
];

let tags: App.DB.ServerTag[] = [
	{
		id: 1,
		server_id: -1,
		order: 1,
		name: 'Blues',
		color: ServerTagColor.Blue,
	},
	{
		id: 2,
		server_id: -1,
		order: 2,
		name: 'Jazz',
		color: ServerTagColor.Purple,
	},
	{
		id: 3,
		server_id: -1,
		order: 3,
		name: 'Rock \'n Roll',
		color: ServerTagColor.Green,
	},
];

let server_tag_users : App.DB.ServerTagUser[] = [
	{
		id: 1,
		server_tag_id: 1,
		server_user_id: 1,
	},
	{
		id: 2,
		server_tag_id: 2,
		server_user_id: 2,
	},
	{
		id: 3,
		server_tag_id: 3,
		server_user_id: 3,
	},
	{
		id: 4,
		server_tag_id: 3,
		server_user_id: 4,
	},
	{
		id: 5,
		server_tag_id: 3,
		server_user_id: 5,
	},
];

let voice_channel_users: App.P2P.VoiceChannelUser[] = [
	{
		user_id: 1,
		channel_id: 1,
		is_live: false,
		is_talking: true,
	},
	{
		user_id: 2,
		channel_id: 1,
		is_live: false,
		is_talking: false,
	},
	{
		user_id: 3,
		channel_id: 2,
		is_live: false,
		is_talking: true,
	},
	{
		user_id: 4,
		channel_id: 2,
		is_live: false,
		is_talking: false,
	},
	{
		user_id: 5,
		channel_id: 2,
		is_live: false,
		is_talking: true,
	},
	{
		user_id: 6,
		channel_id: 2,
		is_live: false,
		is_talking: false,
	},	
	{
		user_id: 3,
		channel_id: 2,
		is_live: true,
		is_talking: false,
	},
	{
		user_id: 4,
		channel_id: 2,
		is_live: true,
		is_talking: true,
	}
];

server_users.forEach((userServer) => {
	userServer._user = users_on_server.find((user) =>
		user.id === userServer.user_id
	);
	userServer._tags = server_tag_users
		.filter((stu) => stu.user_server_id === userServer.id)
		.map((stu) =>
			tags.find((tag) => tag.id === stu.server_tag_id)
		) as App.DB.ServerTag[];
});

const voiceUsers = voice_channel_users.filter((vcu) => vcu.channel_id === voiceId);
voiceUsers.forEach((vcu) => {
	vcu._user = server_users.find((us) => us._user?.id === vcu.user_id)?._user;
});


export const load = (async ({ parent }) => {
	return {
		//users_on_server,
		server_users,
		channel_groups,
		text_channels,
		voice_channels,
		voice_channel_users,
		//tags,
		//server_tag_users,
	};
}) satisfies LayoutServerLoad;
