import { ServerTagColor, ServerRole } from '$src/lib/enum';
import type { LayoutLoad } from './$types';

let server_users: App.DB.ServerUser[] = [
	{
		id: 1,
		server_id: -1,
		user_id: 1,
		display_name: 'Ben',
		role: ServerRole.Owner,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 2,
		server_id: -1,
		user_id: 2,
		display_name: 'The General',
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 3,
		server_id: -1,
		user_id: 3,
		display_name: 'The Sennator',
		role: ServerRole.Moderator,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 4,
		server_id: -1,
		user_id: 4,
		display_name: 'Darth Vader',
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 5,
		server_id: -1,
		user_id: 5,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 6,
		server_id: -1,
		user_id: 6,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 7,
		server_id: -1,
		user_id: 7,
		display_name: null,
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 8,
		server_id: -1,
		user_id: 8,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 9,
		server_id: -1,
		user_id: 9,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 10,
		server_id: -1,
		user_id: 10,
		display_name: null,
		role: ServerRole.Admin,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 11,
		server_id: -1,
		user_id: 11,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 12,
		server_id: -1,
		user_id: 12,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z'
	}
];

const text_channels: App.DB.TextChannel[] = [
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
	}
];

const voice_channels: App.DB.VoiceChannel[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Voice Channel 3',
		order: 3,
		channel_group_id: null,
		max_users: 10
	},
	{
		id: 2,
		server_id: -1,
		name: 'Voice Channel 2.2',
		order: 2,
		channel_group_id: 1,
		max_users: 2
	},
	{
		id: 3,
		server_id: -1,
		name: 'Voice Channel 4.2',
		order: 2,
		channel_group_id: 2,
		max_users: null
	}
];

const channel_groups: App.DB.ChannelGroup[] = [
	{
		id: 1,
		server_id: -1,
		name: 'Group 2.X',
		order: 2
	},
	{
		id: 2,
		server_id: -1,
		name: 'Group 4.X',
		order: 4
	}
];

const tags: App.DB.ServerTag[] = [
	{
		id: 1,
		server_id: -1,
		order: 1,
		name: 'Blues',
		color: ServerTagColor.Blue
	},
	{
		id: 2,
		server_id: -1,
		order: 2,
		name: 'Jazz',
		color: ServerTagColor.Purple
	},
	{
		id: 3,
		server_id: -1,
		order: 3,
		name: "Rock 'n Roll",
		color: ServerTagColor.Green
	}
];

const server_tag_users: App.DB.ServerTagUser[] = [
	{
		id: 1,
		server_tag_id: 1,
		server_user_id: 1
	},
	{
		id: 2,
		server_tag_id: 2,
		server_user_id: 2
	},
	{
		id: 3,
		server_tag_id: 3,
		server_user_id: 3
	},
	{
		id: 4,
		server_tag_id: 3,
		server_user_id: 4
	},
	{
		id: 5,
		server_tag_id: 3,
		server_user_id: 5
	}
];

const voice_channel_users: App.P2P.VoiceChannelUser[] = [
	{
		id: 1,
		server_user_id: 1,
		channel_id: 1,
		is_live: false,
		is_talking: true
	},
	{
		id: 2,
		server_user_id: 2,
		channel_id: 1,
		is_live: false,
		is_talking: false
	},
	{
		id: 3,
		server_user_id: 3,
		channel_id: 2,
		is_live: false,
		is_talking: true
	},
	{
		id: 4,
		server_user_id: 4,
		channel_id: 2,
		is_live: false,
		is_talking: false
	},
	{
		id: 5,
		server_user_id: 5,
		channel_id: 2,
		is_live: false,
		is_talking: true
	},
	{
		id: 6,
		server_user_id: 6,
		channel_id: 2,
		is_live: false,
		is_talking: false
	},
	{
		id: 7,
		server_user_id: 7,
		channel_id: 2,
		is_live: true,
		is_talking: false
	},
	{
		id: 8,
		server_user_id: 8,
		channel_id: 2,
		is_live: true,
		is_talking: true
	}
];

export const load = (async ({ parent, params }) => {
	const pageData = await parent();
	const serverId = parseInt(params.server_id);
	// fill server_users with users
	server_users.forEach((us) => {
		us.user = pageData._all_users.find((user) => user.id === us.user_id);
		us._tags = server_tag_users
			.filter((stu) => stu.server_user_id === us.id)
			.map((stu) => tags.find((tag) => tag.id === stu.server_tag_id)) as App.DB.ServerTag[];
	});
	// sort server_users
	server_users = server_users.sort((a, b) => a.user?.status - b.user?.status);
	// fill voice_channel_users with server_user
	voice_channel_users.forEach((vcu) => {
		vcu._server_user = server_users.find((su) => su.id === vcu.server_user_id);
	});
	// add server_users to voice channels
	voice_channels.forEach((vc) => {
		vc._voice_users = voice_channel_users.filter((vcu) => vcu.channel_id === vc.id);
	});
	return {
		server_user: pageData.server_users.find((us) => us.server_id === serverId),
		server_users,
		channel_groups,
		text_channels,
		voice_channels,
		voice_channel_users,
		tags
	};
}) satisfies LayoutLoad;
