<script lang="typescript">
	import Button, { ButtonAlignment, ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import { browser } from '$app/environment';
	import { onMount, type ComponentEvents } from 'svelte';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import type { NavItem } from '$src/components/controls/navigation/Navigation.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import ImageIcon from '$src/components/views/ImageIcon.svelte';
	import Navigation from '$src/components/controls/navigation/Navigation.svelte';
	import type { LayoutData } from './$types';
	import VoiceConnection from '$src/components/views/VoiceConnection.svelte';
	import DockItem from '$src/components/controls/navigation/DockItem.svelte';
	import { match } from '$src/lib/navigation';
	
	export let data: LayoutData;
	data.server_users = data.server_users.sort((a, b) => a.order - b.order);

	let indicatorTop: number;

	onMount(() => {
	});

	function updateIndicator(evt: CustomEvent<ComponentEvents<DockItem>["active"]>) {
		indicatorTop = evt.detail;
	}
</script>

<template>
	<div id="layout-app" class="layout-pane row items-stretch {$connectedVoiceChannel ? 'voice-connected' : ''}">
		<nav id="dock">
			<div id="indicator" style="top: calc({indicatorTop}px + 1.25rem);"></div>
			<DockItem
				path="/app/messages/friends/all"
				match={2}
				title="Messages"
				on:active={updateIndicator}>
				<Logo/>
			</DockItem>
			<DockItem
				path="/app/admin"
				match={2}
				title="Admin"
				icon={Icons.DevTools}
				on:active={updateIndicator}/>
			<hr/>
			{#each data.server_users as item}
				{#if item._server}
					<DockItem
						path={`/app/servers/${item.id}/text/${item._server.text_channel_id}`}
						match={3}
						title={item._server.name}
						img={item._server.image}
						icon={Icons.Home}
						on:active={updateIndicator}/>
				{/if}
			{/each}
			<hr/>
			<DockItem
				class="!mb-auto"
				path="/app/servers/create"
				title="Create Server"
				icon={Icons.Add}
				on:active={updateIndicator}/>
			<DockItem
				path="/app/settings"
				match={2}
				title="Settings"
				icon={Icons.Settings}
				on:active={updateIndicator}/>
			<VoiceConnection user={data.user}/>
		</nav>
		<slot/>
	</div>
</template>

<style global lang="postcss">
	#layout-app.layout-pane {
		& > #dock,
		& > #sidebar { padding-bottom: calc(3.5rem + 1px) !important; }
		&.voice-connected > #dock,
		&.voice-connected > #sidebar { padding-bottom: calc(7rem + 2px) !important; }

		& > nav#dock {
			@apply w-20 p-2 flex flex-col items-stretch
			border-r overflow-y-auto overflow-x-hidden
			border-gray-300 dark:border-gray-800;
			& > hr {
				@apply w-8 mx-auto mb-2
				border-t-2 border-gray-300 dark:border-gray-800;
			}
			& > #indicator {
				@apply absolute top-0 left-0 w-1 h-6
				bg-accent-500 dark:bg-gray-300 rounded-r
				transition-[top] duration-200 ease-in-out;
			}
			& > .dock-item {
				@apply flex-none mb-2;
			}
		}
		& > #sidebar > header,
		& > #content > header {
			@apply flex items-center
			border-b h-14;

			& > div {
				@apply flex items-center;
				&:first-child {
					@apply flex-1 overflow-hidden px-2;
				}
				&:last-child {
					@apply flex-none pr-2;
				}
				& > .icon {
					@apply mr-1;
				}
				& > .text {
					@apply mb-[2px];
					&:last-child {
						@apply flex-1 mt-[2px];
					}
				}
				& > .divider {
					@apply w-[1px] h-6 mx-2
					rotate-12
					bg-gray-300 dark:bg-gray-700;
				}
				& > .button {
					&:hover {
						@apply border-gray-300 dark:border-gray-700;
					}
				}
				& > .navigation-group {
					@apply ml-2;
				}
			}
		}
		& > #sidebar {
			@apply w-72 ml-[-1px]
			border-x border-l
			border-gray-300 dark:border-gray-800;
			&:not(.padded) {
				padding-bottom: calc(3.5rem + 1px);
			}
			&.padded {
				padding-bottom: calc(7.5rem + 2px);
			}
			& > header {
				@apply border-gray-300 dark:border-gray-800;
			}
		}
		& > #content {
			@apply flex-1 ml-[-1px]
			overflow-y-hidden
			bg-white dark:bg-gray-800
			border-l
			border-gray-300 dark:border-gray-700
			shadow-sm;

			& > header {
				@apply border-gray-300 dark:border-gray-700
				shadow-sm relative;
			}

			& > main {
				@apply overflow-hidden;
			}
		}
	}
</style>
