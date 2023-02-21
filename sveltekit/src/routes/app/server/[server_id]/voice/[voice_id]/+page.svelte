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

	let refVideo: HTMLVideoElement | undefined;
	let stream: MediaStream | undefined;

	function openStream() {
		navigator.mediaDevices.getUserMedia({ audio: true, video: true })
			.then((s) => {
				stream = s;
				if (refVideo) refVideo.srcObject = s;
				refVideo?.play();
			});
	}
</script>

<template>
	<main id="server-voice" class="fill">
		{#if stream}
			<div id="server-voice-stream">
				<video bind:this={refVideo}/>
			</div>
		{:else}
			<div id="server-voice-users">
				{#each data.channel.voice_users as vcu}
					<UserVoiceView data={vcu} on:click={openStream}/>
				{/each}
			</div>
		{/if}
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
	#server-voice {
		@apply flex flex-col;
		& > div {
			&:first-child {
				@apply h-full overflow-auto;
				flex: 0 1 80vw;
			}
			&:nth-child(2) {
				@apply h-full overflow-auto
				bg-white dark:bg-gray-800;
				flex: 1 1 auto;
			}
		}
	}

	#server-voice-stream {
		@apply flex items-center justify-center
		bg-black;
		& > video {
			@apply h-full aspect-video;
		}
	}

	#server-voice-users {
		@apply flex flex-wrap
		items-center justify-center
		border-b border-gray-300 dark:border-gray-700
		bg-gray-100 dark:bg-gray-900;
		& > .button.user-voice-view {
			@apply m-2;
			flex: 0 1 15rem;
		}
	}
</style>
