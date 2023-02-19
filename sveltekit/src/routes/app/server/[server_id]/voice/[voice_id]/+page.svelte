<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$comps/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import { debounce } from '$src/lib/helpers';
	import type { LayoutData } from './$types';
	import ChatMessage from '$src/components/ChatMessage.svelte';
	import ChatView from '$src/components/ChatView.svelte';
	import UserVoiceView from '$src/components/user/UserVoiceView.svelte';

	export let data: LayoutData;
</script>

<template>
	<div id="view-voice-chat">
		<ChatView>
			{#each data.channel.messages as message}
				<ChatMessage data={message}/>
			{/each}
		</ChatView>
	</div>
	<div id="view-voice-channel-users">
		{#each data.channel.voice_users as vcu}
			<UserVoiceView data={vcu}/>
		{/each}
	</div>
</template>

<style lang="postcss">
	#view-voice-chat {
		@apply flex-1 !important;
	}
	#view-voice-channel-users {
		@apply flex-1 !important;
		@apply grid grid-cols-2 gap-2
		p-2 items-center justify-center;
	}
</style>
