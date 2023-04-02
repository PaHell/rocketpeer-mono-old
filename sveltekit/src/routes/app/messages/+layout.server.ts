import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { PayloadType, UserFriendStatus, UserStatus } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const chats: App.DB.Chat[] = [
	{
		id: 1,
		name: null,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 2,
		name: null,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 3,
		name: null,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 4,
		name: null,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
];

const chat_users: App.DB.ChatUser[] = [
	{
		id: 1,
		chat_id: 1,
		user_id: 1,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 2,
		chat_id: 2,
		user_id: 2,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 3,
		chat_id: 3,
		user_id: 3,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 4,
		chat_id: 4,
		user_id: 4,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 5,
		chat_id: 4,
		user_id: 5,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 6,
		chat_id: 4,
		user_id: 6,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
];

const user_friends: App.DB.UserFriend[] = [
	{
		id: 1,
		sender_id: 1,
		recipient_id: 2,
		status: UserFriendStatus.Accepted,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 1,
		sender_id: 3,
		recipient_id: 1,
		status: UserFriendStatus.Pending,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 1,
		sender_id: 1,
		recipient_id: 4,
		status: UserFriendStatus.Pending,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
	{
		id: 1,
		sender_id: 5,
		recipient_id: 1,
		status: UserFriendStatus.Accepted,
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
	},
];

export const load = (async ({params, parent, url}) => {
	const pageData = await parent();
	chats.forEach((chat) => {
		chat.users = chat_users
			.filter(cu => cu.chat_id === chat.id)
			.map(cu => pageData._all_users.find(u => u.id === cu.user_id));
	});
	user_friends.forEach((uf) => {
		uf._other = pageData._all_users.find(u => u.id === uf.sender_id);
	});
	return {
		chats,
		user_friends,
	};
}) satisfies LayoutServerLoad;
