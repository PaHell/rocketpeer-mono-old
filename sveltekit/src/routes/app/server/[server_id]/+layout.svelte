<script lang="ts">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import { getContext, onMount, setContext } from 'svelte';
	import { mobile } from '$lib/viewSize';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Logo from '$src/components/branding/Logo.svelte';
	import Font from '$src/components/branding/Font.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import Channel from './Channel.svelte';
	import UserImage from '$src/components/user/UserImage.svelte';
	import UserDisplay from '$src/components/user/UserDisplay.svelte';
	
	export let data: LayoutData;
	let server: App.Database.Servers.Server | undefined;
	let serverChannels: (App.Database.Servers.Channels.Channel |
		App.Database.Servers.Channels.ChannelGroup)[] = [];

	let micOff = false;
	let speakersOff = false;

	onMount(() => {
		refreshServer();
	});

	page.subscribe((page) => {
		refreshServer();
	});
	
	function refreshServer() {
		var serverId = parseInt($page.params.server_id);
		// find matching server
		server = data.servers.find(s => s.id === serverId);
		const ungrouped: App.Database.Servers.Channels.Channel[] = [];
		const groups: App.Database.Servers.Channels.ChannelGroup[] = [...data.channel_groups];
		// clear channels in groups
		groups.forEach(g => g._channels = []);
		// find ungrouped channels, add others to groups
		data.channels.forEach((channel) => {
			// set server id
			channel.server_id = serverId;
			// find group
			const group = groups.find((group) => group.id === channel.channel_group_id);
			if (group) group._channels.push({...channel});
			else ungrouped.push({...channel});
		});
		// sort channels in groups
		groups.forEach(g => g._channels = g._channels.sort(c => c.order));
		// add ungrouped channels and sort
		serverChannels = [...groups, ...ungrouped].sort((a,b) => a.order - b.order);
	}

	function toggleMicrophone() {
		if (speakersOff) speakersOff = false;
		micOff = !micOff;
	}

	function toggleSpeakers() {
		speakersOff = !speakersOff;
		if (speakersOff) micOff = true;
	}
</script>


<nav id="sidebar">
	<header>
		<div>
			<p class="pl-2 text font-bold">{server?.name}</p>
		</div>
		<div>
			<Button
				icon={Icons.Settings}
				variant={ButtonVariant.Transparent}
				on:click={() => {}}
				/>
		</div>
	</header>
	<main class="list-channel-groups">
		{#each serverChannels as item}
			{#if Object.hasOwn(item, "_channels")}
				<Button
					variant={ButtonVariant.Transparent}
					on:click={() => {}}>
					<Icon name={Icons.SelectDown} />
					<p class="text">{item.name}</p>
				</Button>
				<div class="list-channels">
					{#each item._channels as channel}
						<Channel {channel}/>
					{/each}
				</div>
			{:else}
				<Channel channel={item}/>
			{/if}
		{/each}
	</main>
	<footer class="voice-connection">
		<section class="pl-2">
			<div>
				<div class="flex items-center">
					<Icon name={Icons.VoiceConnectionMedium} class="mr-1 text-success-500 small" />
					<p class="text text-label bold">Voice Connected!</p>
				</div>
				<p class="text text-label sec">Channel: Voice Channel 1</p>
			</div>
			<Button
				variant={ButtonVariant.Card}
				on:click={() => {}}>
				<Icon name={Icons.VoiceDisconnect} class="!text-danger-500" />
			</Button>
		</section>
		<section class="h-14">
			{#if data.user}
				<UserDisplay user={data.user} variant={ButtonVariant.None} />
			{/if}
			<Button
				variant={ButtonVariant.Card}
				active={micOff}
				icon={Icons.Microphone}
				class="items-center {micOff ? 'button-red-line' : ''}"
				on:click={toggleMicrophone}/>
			<Button
				variant={ButtonVariant.Card}
				active={speakersOff}
				icon={Icons.Speakers}
				class="items-center {speakersOff ? 'button-red-line' : ''}"
				on:click={toggleSpeakers}/>
		</section>
	</footer>
</nav>
<div id="content">
	<slot/>
</div>


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
	.list-channel-groups {
		@apply flex flex-col items-stretch;
		& > .button,
		& > .list-channels {
			@apply border-gray-300 dark:border-gray-800 !important;
		}
		& > .button {
			@apply px-1
			border-x-0 border-b-0 rounded-none;
			&:not(:first-child) {
				@apply mt-[-1px];
			}
		}
		& > .channel {
			&:first-child {
				@apply mt-2;
			}
		}
		& > .list-channels {
			@apply border-b;
		}

		& > .list-channels + .channel {
			@apply mt-2;
		}
	}
	.voice-connection {
		& > section {
			@apply flex items-center;
			&:not(:last-child) {
				@apply border-b border-gray-300 dark:border-gray-800;
			}
			& > div {
				@apply flex-1;
				line-height: 1.125;
			}
			& > .user-display {
				@apply flex-1 h-14 pl-2 pr-2 mr-2
				overflow-hidden
				border-y-0 border-l-0 border-gray-300 dark:border-gray-800
				rounded-none text-left;
				&:hover {
					@apply bg-gray-50 dark:bg-gray-800;
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
