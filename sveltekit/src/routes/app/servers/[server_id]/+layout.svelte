<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import VoiceChannel from '$src/components/views/channel/VoiceChannel.svelte';
	import TextChannel from '$src/components/views/channel/TextChannel.svelte';
	import { page } from '$app/stores';

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
	let serverChannels: (App.DB.TextChannel | App.DB.TextChannel | App.DB.ChannelGroup)[] = [];

	onMount(() => {
		refreshServer();
	});

	page.subscribe(refreshServer);
	
	function refreshServer() {
		var serverId = parseInt($page.params.server_id);
		const ungrouped: (App.DB.TextChannel | App.DB.VoiceChannel)[] = [];
		const groups: App.DB.ChannelGroup[] = [...data.channel_groups];
		// clear channels in groups
		groups.forEach(g => g._channels = []);
		// collect all channels
		const channels: ((App.DB.TextChannel | App.DB.VoiceChannel) & TypedChannel)[] = [
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
</script>

<template>
	<header>
		<div>
			<p class="pl-2 text font-bold">{data.server_user?._server?.name}</p>
		</div>
		<div>
			<Button
				icon={Icons.Settings}
				variant={ButtonVariant.Transparent}
				on:click={() => {}}
				/>
		</div>
	</header>
	<nav class="list-channel-groups">
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
						<svelte:component this={components[channel.type]} {channel} />
					{/each}
				</div>
			{:else}
				<svelte:component this={components[item.type]} channel={item}/>
			{/if}
		{/each}
	</nav>
	<slot/>
</template>

<style global lang="postcss">
	.list-channel-groups {
		@apply flex flex-col
		overflow-x-hidden overflow-y-auto;
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
    .channel-users {
        @apply flex flex-col px-2 -mt-1;
        & > .button {
            @apply pl-1 pr-2;
            &:last-child {
                @apply mb-2;
            }
            & > .image-icon {
                @apply mr-2;
            }
            &.talking > .image-icon {
                @apply border-accent-500 ring-1 ring-accent-500;
            }
        }
    }
</style>
