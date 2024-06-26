<script lang="typescript">
	import Icon, { Icons } from "$src/components/general/Icon.svelte";
	import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import UserView from "$src/components/views/user/View.svelte";
	import { connectedVoiceChannel } from "$src/store";

    export let user: App.DB.User | undefined;
    
    let micOff = false;
	let speakersOff = false;

    function toggleMicrophone() {
		if (speakersOff) speakersOff = false;
		micOff = !micOff;
	}

	function toggleSpeakers() {
		speakersOff = !speakersOff;
		if (speakersOff) micOff = true;
	}

	function disconnect() {
		connectedVoiceChannel.set(undefined);
	}

</script>

<template>
    <footer class="voice-connection">
		{#if $connectedVoiceChannel}
			<section class="pl-2">
				<div>
					<div class="flex items-center">
						<Icon name={Icons.VoiceConnectionMedium} class="mr-1 text-success-500 small" />
						<p class="text text-label bold">Voice Connected!</p>
					</div>
					<p class="text text-label sec">{$connectedVoiceChannel.name}</p>
				</div>
				<Button
					variant={ButtonVariant.Transparent}
					on:click={disconnect}>
					<Icon name={Icons.VoiceDisconnect} class="!text-danger-500" />
				</Button>
			</section>
		{/if}
		<section class="h-14">
			{#if user}
				<UserView {user} variant={ButtonVariant.Transparent} showStatus />
			{/if}
			<Button
				variant={ButtonVariant.Transparent}
				active={micOff}
				icon={Icons.Microphone}
				class={micOff ? 'button-red-line' : ''}
				on:click={toggleMicrophone}/>
			<Button
				variant={ButtonVariant.Transparent}
				active={speakersOff}
				icon={Icons.Speakers}
				class={speakersOff ? 'button-red-line' : ''}
				on:click={toggleSpeakers}/>
		</section>
	</footer>
</template>

<style global lang="postcss">
	.button.button-red-line {
		&:after {
			content: '';
			@apply block fixed w-[2px] h-[30px] ml-[6px]
				rotate-45 origin-center bg-danger-500;
		}
		&.active > .icon {
			@apply text-icon-sec dark:text-icon-dark-sec;
		}
	}
	.voice-connection {
		@apply bg-gray-100 dark:bg-gray-900;
		& > section {
			@apply flex items-center;
			&:not(:last-child) {
				@apply border-b border-gray-300 dark:border-gray-800;
			}
			& > div {
				@apply flex-1;
				line-height: 1.125;
			}
			& > .user-view {
				@apply flex-1 h-14 pl-2 pr-2 mr-2
				overflow-hidden
				border-y-0 border-l-0 border-gray-300 dark:border-gray-800
				rounded-none text-left;
				&:hover,
				&:focus {
					@apply bg-gray-100 dark:bg-gray-800
					border-gray-300 dark:border-gray-800;
				}
				&:active {
					@apply shadow-none;
				}
			}
			& > button:not(:first-child) {
				@apply my-2 mr-1;
				&:last-child {
					@apply mr-2;
				}
			}
		}
	}
</style>