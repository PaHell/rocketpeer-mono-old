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
		content: 'General Kenobi!\nYou are a bold one.',
		created_at: new Date('2012-11-10 09:08:07 PDT').toUTCString(),
		updated_at: null,
		deleted_at: null
	},
];

export const load = (async ({ params, parent }) => {
	const pageData = await parent();
	const voiceId = parseInt(params.voice_id);
	messages.forEach((m) => {
		m._user = pageData.users.find((u) => u.id === m.user_id);
		m.channel_id = voiceId;
	});
	const voiceUsers = pageData.voice_channel_users.filter((vcu) => vcu.channel_id === voiceId);
	voiceUsers.forEach((vcu) => {
		vcu._user = pageData.users.find((u) => u.id === vcu.user_id);
	});
	return {
		channel: {
			...pageData.voice_channels.find((c) => c.id === voiceId),
			voice_users: pageData.voice_channel_users.filter((vcu) => vcu.channel_id === voiceId),
			messages: messages
		} as App.Database.Servers.Channels.VoiceChannel
	};
}) satisfies LayoutServerLoad;
