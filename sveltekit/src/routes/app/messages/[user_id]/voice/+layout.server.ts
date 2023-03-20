export const prerender = false;
export const ssr = false;

import { Icons } from '$src/components/general/Icon.svelte';
import { PayloadType } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

const messages: App.Database.Chat.Message[] = [
	{
		id: 1,
		user_id: 1,
		channel_id: -1,
		type: PayloadType.Text,
		payload: 'Hello there.',
		created_at: new Date('2013-12-11 10:09:08 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 2,
		user_id: 2,
		channel_id: -1,
		type: PayloadType.Text,
		payload: 'General Kenobi!\nYou are a bold one.\nKill him!',
		created_at: new Date('2012-11-10 09:08:07 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 3,
		user_id: 2,
		channel_id: -1,
		type: PayloadType.Text,
		payload: 'Back away! I will deal with this Jedi slime myself.',
		created_at: new Date('2011-10-09 08:07:06 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 4,
		user_id: 1,
		channel_id: -1,
		type: PayloadType.Text,
		payload: 'Your move.',
		created_at: new Date('2010-09-08 07:06:05 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 5,
		user_id: 2,
		channel_id: -1,
		type: PayloadType.Text,
		payload: "You fool. I've been trained in your Jedi arts by Count Dooku.",
		created_at: new Date('2009-08-07 06:05:04 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
	{
		id: 6,
		user_id: 2,
		channel_id: -1,
		type: PayloadType.Text,
		payload: 'Attack, Kenobi!',
		created_at: new Date('2008-07-06 05:04:03 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
];

export const load = (async ({ params, parent }) => {
	const pageData = await parent();
	const voiceId = parseInt(params.voice_id);
	messages.forEach((m) => {
		m._user = pageData.all_users.find((u) => u.id === m.user_id);
		m.channel_id = voiceId;
	});
	const voiceUsers = pageData.voice_channel_users.filter((vcu) => vcu.channel_id === voiceId);
	voiceUsers.forEach((vcu) => {
		vcu._user = pageData.all_users.find((u) => u.id === vcu.user_id);
	});
	return {
		channel: {
			...pageData.voice_channels.find((c) => c.id === voiceId),
			voice_users: pageData.voice_channel_users.filter((vcu) => vcu.channel_id === voiceId),
			messages: messages
		} as App.Database.Servers.Channels.VoiceChannel
	};
}) satisfies LayoutServerLoad;
