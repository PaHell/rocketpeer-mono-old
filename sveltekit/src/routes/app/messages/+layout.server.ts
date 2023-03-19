import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { ContentType, RoleColor, UserStatus } from '$src/lib/enum';
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

let messages: App.Database.Messages.Message[] = [
	{
		id: 0,
		sender_id: 1,
		recipient_id: 2,
		type: ContentType.Text,
		payload: 'Hello there!',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 1,
		sender_id: 2,
		recipient_id: 1,
		type: ContentType.Text,
		payload: 'General Kenobi!',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 2,
		sender_id: 1,
		recipient_id: 2,
		type: ContentType.Text,
		payload: 'You are a bold one!',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 3,
		sender_id: 2,
		recipient_id: 1,
		type: ContentType.Text,
		payload: 'I have been waiting for you, Obi-Wan.',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 4,
		sender_id: 1,
		recipient_id: 2,
		type: ContentType.Text,
		payload: 'A long time, General.',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
	{
		id: 5,
		sender_id: 1,
		recipient_id: 3,
		type: ContentType.Text,
		payload: 'Hello there!',
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: null,
		deleted_at: null
	},
];

export const load = (async ({params, parent}) => {
	const pageData = await parent();
	// group messages by user
	const chats = messages.reduce((acc, msg) => {
		// find partner
		const partner = all_users.find(u => {
			if (u.id === pageData.user.id) return false;
			return u.id == msg.sender_id || u.id == msg.recipient_id;
		});
		if (!partner) return;
		// copy message and fill sender and recepient
		if (msg.sender_id === partner.id) {
			msg._sender = partner;
			msg._recipient = pageData.user;
		} else {
			msg._sender = pageData.user;
			msg._recipient = partner;
		}
		// add to group
		const index = acc.findIndex(m => m[0].id === partner.id);
		if (index === -1) {
			acc.push([partner, [msg]]);
		} else {
			acc[index][1].push(msg);
		}
		return acc;
	}, [] as [App.Database.User, App.Database.Messages.Message[]][]);
	return {
		all_users,
		chats,
	};
}) satisfies LayoutServerLoad;
