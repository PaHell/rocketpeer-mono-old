<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import type { LayoutData } from './$types';
	import ChatMessage from '$src/components/views/chat/Message.svelte';
	import ChatView from '$src/components/views/chat/View.svelte';
	import { onDestroy } from 'svelte';
	import VideoPlayer from '$src/components/controls/VideoPlayer.svelte';

	export let data: LayoutData;

	let stream: MediaStream | undefined;
	let showStream = false;
	let showChat = true;

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
			stream = mediaStream;
		});
	}

	function closeStream() {
		if (!stream) return;
		stream.getTracks().forEach((track) => {
			track.stop();
		});
		showStream = false;
	}

</script>

<template>
	<main id="server-voice" class="fill" class:show-chat={showChat}>
		{#if showStream}
			<VideoPlayer {stream}>
				<svelte:fragment slot="left">
					<Button variant={ButtonVariant.Transparent}
						icon={Icons.Down}
						text={showChat ? "Hide" : "Show"}
						on:click={() => showChat = !showChat}/>
				</svelte:fragment>
				<svelte:fragment slot="center">
					<Button variant={ButtonVariant.Transparent}
						icon={Icons.Logout}
						text="Close"
						on:click={closeStream}/>
				</svelte:fragment>
			</VideoPlayer>
		{:else}
			<div id="server-voice-users">
				<div>
				</div>
				<footer>
					<Button variant={ButtonVariant.Secondary}
						on:click={() => {}}>
						<Icon name={Icons.VoiceDisconnect} class="!text-danger-500" />
						<p class="text">Disconnect</p>
					</Button>
				</footer>
			</div>
		{/if}
		<div>
			<ChatView>
				{#each data.messages as message}
					<ChatMessage
						sender={message._user}
						display_name={message._user?.display_name}
						time={message.created_at}
						type={message.type}
						payload={message.payload}/>
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
				@apply relative z-10;
				@apply min-h-[60vh] transition-[min-height];
			}
			&:nth-child(2) {
				@apply flex-1 overflow-hidden
				bg-white dark:bg-gray-800;
			}
		}
		&:not(.show-chat) {
			& > div {
				&:first-child {
					@apply min-h-full;
				}
				&:nth-child(2) {
					@apply flex-shrink flex-grow-0;
				}
			}
		}
	}

	#server-voice-users {
		@apply flex flex-col border-b
		border-gray-300 dark:border-gray-700
		bg-gray-100 dark:bg-gray-900;
		& > div {
			@apply flex-1 flex items-center justify-center
			flex-wrap content-center;
			& > .button.user-voice {
				@apply m-2;
				flex: 0 1 15rem;
			}
		}	
		& >	footer {
			@apply flex justify-center p-2;
		}	
	}
</style>
