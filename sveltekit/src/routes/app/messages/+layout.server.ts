import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserStatus } from '$src/components/user/user';
import { ContentType, RoleColor } from '$src/lib/enum';
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
];

export const load = (async ({params, parent}) => {
	const pageData = await parent();
	// group messages by user
	const grouped = messages.reduce((acc, m) => {
		// find partner
		const partner = all_users.find(u => u.id !== m.sender_id || u.id !== m.recipient_id);
		if (!partner) return;
		// copy message and fill sender and recepient
		const message = { ...m };
		if (m.sender_id === partner.id) {
			message._sender = partner;
			message._recipient = pageData.user;
		} else {
			message._sender = pageData.user;
			message._recipient = partner;
		}
		// add to group
		const index = acc.findIndex(m => m[0].id === partner.id);
		if (index === -1) {
			acc.push([partner, [m]]);
		} else {
			acc[index][1].push(m);
		}
		return acc;
	}, [] as [App.Database.User, App.Database.Messages.Message[]][]);
	return {
		all_users,
		messages: grouped,
	};
}) satisfies LayoutServerLoad;
