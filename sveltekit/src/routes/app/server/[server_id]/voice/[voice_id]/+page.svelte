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
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import { onDestroy } from 'svelte';

	export let data: LayoutData;

	let video: HTMLVideoElement | undefined;
	let stream: MediaStream | undefined;
	let showStream = false;
	let videoWidth = 0;
	let videoHeight = 0;

	onDestroy(() => {
		closeStream();
	});

	function openStream() {
		showStream = true;
		navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		})
		.then((mediaStream) => {
			if (!video) return;	
			stream = mediaStream;
			video.srcObject = mediaStream;
		});
	}

	function closeStream() {
		if (!stream) return;
		stream.getTracks().forEach((track) => {
			track.stop();
		});
		showStream = false;
	}

	function onCanPlay() {
		if (!video) return;
		videoWidth = video.videoWidth;
		videoHeight = video.videoHeight;
	}
</script>

<template>
	<main id="server-voice" class="fill">
		{#if showStream}
			<div id="server-voice-stream">
				<video bind:this={video} on:canplay={onCanPlay} autoplay playsinline>
					<Alert variant={AlertVariant.Danger}
						title="Error!"
						text="Your browser does not support video streaming." />
					<track kind="captions" />
				</video>
				<footer class="fixed">
					<Button variant={ButtonVariant.Primary}
						icon={Icons.Logout}
						text="Close"
						on:click={closeStream}/>
				</footer>
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
				@apply min-h-[60vh]
				flex items-center justify-center;
			}
			&:nth-child(2) {
				@apply flex-1 overflow-hidden
				bg-white dark:bg-gray-800;
			}
		}
	}

	#server-voice-stream {
		@apply content-center bg-black;
		& > video {
			@apply h-full;
		}
	}

	#server-voice-users {
		@apply flex-wrap content-center border-b
		border-gray-300 dark:border-gray-700
		bg-gray-100 dark:bg-gray-900;
		& > .button.user-voice-view {
			@apply m-2;
			flex: 0 1 15rem;
		}
	}
</style>
