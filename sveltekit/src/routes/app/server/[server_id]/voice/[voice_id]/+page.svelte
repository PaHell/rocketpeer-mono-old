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
	<main class="fill" id="view-server-voice-channel">
		<div>
			<div>
				{#each data.channel.voice_users as vcu}
					<UserVoiceView data={vcu}/>
				{/each}
			</div>
		</div>
		<div>
			<ChatView>
				{#each data.channel.messages as message}
					<ChatMessage data={message}/>
				{/each}
			</ChatView>
		</div>
	</main>
</template>

<style global lang="postcss">
	#view-server-voice-channel {
		@apply flex flex-col;
		& > div {
			&:first-child {
				@apply flex-1 !important;
				@apply flex items-center justify-center
				bg-gray-100 dark:bg-gray-900;
				& > div {
					@apply grid grid-cols-1 gap-4
					items-center justify-center
					w-full p-4
					xl:grid-cols-2;
					& > .button.user-voice-view {
						@apply w-full;
					}
				}
			}
			&:nth-child(2) {
				@apply flex-1 border-l-0 border-t
				bg-white dark:bg-gray-800 !important;
			}
		}
	}
</style>
