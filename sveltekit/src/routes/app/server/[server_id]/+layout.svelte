<script lang="typescript">
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
	import UserImage from '$src/components/user/UserImage.svelte';
	import UserDisplay from '$src/components/user/UserDisplay.svelte';
	import VoiceConnection from '$src/components/user/VoiceConnection.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import VoiceChannel from '$src/components/VoiceChannel.svelte';
	import TextChannel from '$src/components/TextChannel.svelte';

	enum ChannelType {
		Text,
		Voice,
	}

	const components = [
		TextChannel,
		VoiceChannel,
	]

	interface TypedChannel {
		type: ChannelType;
	}
	
	export let data: LayoutData;
	let server: App.Database.Servers.Server | undefined;
	let serverChannels: (
		App.Database.Servers.Channels.TextChannel
		| App.Database.Servers.Channels.TextChannel
		| App.Database.Servers.Channels.ChannelGroup)[] = [];

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
		const ungrouped: (App.Database.Servers.Channels.TextChannel | App.Database.Servers.Channels.VoiceChannel)[] = [];
		const groups: App.Database.Servers.Channels.ChannelGroup[] = [...data.channel_groups];
		// clear users in voice channels
		data.voice_channels.forEach((channel) => {
			channel._voice_users = [];
		});
		// add users to voice channels
		data.voice_channel_users.forEach((vcu) => {
			const channel = data.voice_channels.find((channel) => channel.id === vcu.channel_id);
			if (channel) {
				const user = data.users.find((user) => user.id === vcu.user_id);
				if (!channel._voice_users) channel._voice_users = [];
				if (user) vcu._user = user;
				channel._voice_users.push(vcu);
			}
		});
		// clear channels in groups
		groups.forEach(g => g._channels = []);
		// collect all channels
		const channels: (App.Database.Servers.Channels.TextChannel | App.Database.Servers.Channels.VoiceChannel) & TypedChannel = [
			...data.text_channels.map(c => {
				c.type = ChannelType.Text;
				return c;
			}),
			...data.voice_channels.map(c => {
				c.type = ChannelType.Voice;
				return c;
			}),
		];
		// find ungrouped channels, add others to groups
		channels.forEach((channel) => {
			// set server id
			channel.server_id = serverId;
			// find group
			const group = groups.find((group) => group.id === channel.channel_group_id);
			if (group) {
				if (!group._channels) group._channels = [];
				group._channels.push({...channel});
			}
			else ungrouped.push({...channel});
		});
		// sort channels in groups
		groups.forEach(g => g._channels = g._channels?.sort(c => c.order));
		// add ungrouped channels and sort
		serverChannels = [...groups, ...ungrouped].sort((a,b) => a.order - b.order);
	}

	function onChannelClick(channel: (App.Database.Servers.Channels.VoiceChannel | App.Database.Servers.Channels.TextChannel) & TypedChannel, redirect: () => void) {
		switch (channel.type) {
			case ChannelType.Text:
				redirect();
				break;
			case ChannelType.Voice:
				if ($connectedVoiceChannel?.id !== channel.id) connectedVoiceChannel.set(channel);
				else redirect();
				break;
		}
	}
</script>


<aside id="sidebar" class="layout-pane items-stretch">
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
	<div class="fill list-channel-groups">
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
						<svelte:component this={components[channel.type]} {channel}/>
					{/each}
				</div>
			{:else}
				<svelte:component this={components[item.type]} channel={item}/>
			{/if}
		{/each}
	</div>
	<VoiceConnection user={data.user}/>
</aside>
<div id="content" class="layout-pane items-stretch">
	<slot/>
</div>


<style global lang="postcss">
	.list-channel-groups {
		@apply flex flex-col items-stretch;
		& > .button,
		& > .list-channels {
			@apply border-gray-300 dark:border-gray-800 !important;
		}
		& > .button {
			@apply px-1 rounded-none
			border-x-0 border-b-0;
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
	.channel {
        @apply flex mb-2 px-2;
        &:hover > .button {
            @apply bg-gray-200 border-gray-300
            dark:bg-gray-800 dark:border-gray-700;
            &:last-child {
                @apply pointer-events-auto
                border-gray-300 dark:border-gray-700
                opacity-100;
            }
        }
        & > .button {
            @apply transition-colors !important;
            &:first-child {
                @apply w-full px-2;
                & > .icon {
                    @apply mr-2;
                }
            }
            &:last-child {
                @apply relative pointer-events-none
                rounded-l-none opacity-0
                transition-all;
                margin-left: calc(-2.5rem - 2px);
            }
        }
    }
    .channel-users {
        @apply flex flex-col px-2 -mt-1;
        & > .button {
            @apply pl-1 pr-2;
            &:last-child {
                @apply mb-2;
            }
            & > .user-image {
                @apply mr-2;
            }
            &.talking > .user-image {
                @apply border-accent-500 ring-1 ring-accent-500;
            }
        }
    }
</style>
