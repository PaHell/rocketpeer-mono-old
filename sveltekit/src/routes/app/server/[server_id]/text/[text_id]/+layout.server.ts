import { Icons } from '$src/components/general/Icon.svelte';
import type { LayoutServerLoad } from './$types';

const messages: App.Database.Chat.Message[] = [
	{
		id: 1,
		user_id: 1,
		channel_id: -1,
		content: 'Hello there.',
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 2,
		user_id: 2,
		channel_id: -1,
		content: 'General Kenobi!\nYou are a bold one.\nKill him!',
		created_at: new Date('2012-11-10 09:08:07 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 3,
		user_id: 2,
		channel_id: -1,
		content: 'Back away! I will deal with this Jedi slime myself.',
		created_at: new Date('2011-10-09 08:07:06 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 4,
		user_id: 1,
		channel_id: -1,
		content: 'Your move.',
		created_at: new Date('2010-09-08 07:06:05 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 5,
		user_id: 2,
		channel_id: -1,
		content: "You fool. I've been trained in your Jedi arts by Count Dooku.",
		created_at: new Date('2009-08-07 06:05:04 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 6,
		user_id: 2,
		channel_id: -1,
		content: 'Attack, Kenobi!',
		created_at: new Date('2008-07-06 05:04:03 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 7,
		user_id: 3,
		channel_id: -1,
		content: 'The end of the war is near.',
		created_at: new Date('2007-06-05 04:03:02 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 8,
		user_id: 2,
		channel_id: -1,
		content: 'But the loss of Count Dooku?',
		created_at: new Date('2006-05-04 03:02:01 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 9,
		user_id: 3,
		channel_id: -1,
		content:
			'His death was a necessary loss. Soon I will have a new apprentice, one far younger and more powerful.',
		created_at: new Date('2005-04-03 02:01:00 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	}
];

export const load = (async ({ params, parent }) => {
	const pageData = await parent();
	const textId = parseInt(params.text_id);
	messages.forEach((m) => {
		m._user = pageData.all_users.find((u) => u.id === m.user_id);
		m.channel_id = textId;
	});
	return {
		channel: {
			...pageData.text_channels.find((c) => c.id === textId),
			messages: messages
		} as App.Database.Servers.Channels.TextChannel
	};
}) satisfies LayoutServerLoad;
