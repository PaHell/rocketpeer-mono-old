<script lang="typescript">
	import { Icons } from '$src/components/general/Icon.svelte';
	import Logo from '$src/components/Logo.svelte';
	import { onMount, type ComponentEvents } from 'svelte';
	import { connectedVoiceChannel } from '$src/store';
	import type { LayoutData } from './$types';
	import VoiceConnection from '$src/components/views/VoiceConnection.svelte';
	import DockItem from '$src/components/controls/navigation/DockItem.svelte';
	
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
	<div id="layout-grid">
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
		</nav>
		<VoiceConnection user={data.user}/>
		<slot/>
	</div>
</template>

<style global lang="postcss">
	#layout-grid {
		@apply flex-1 grid overflow-hidden
		bg-gray-300 dark:bg-gray-700;
		grid-gap: 1px;
		grid-template-columns: min-content min-content 1fr min-content;
		grid-template-rows: min-content 1fr min-content;
		grid-template-areas: "dock   nav-header content-header content-header"
							 "dock   nav-main   content-main   sidebar"
							 "footer footer     content-main   sidebar";
		& > * {
			@apply overflow-hidden;
		}
		& > header {
			&:first-of-type { grid-area: nav-header; }
			&:last-of-type { grid-area: content-header; }
		}
		& > nav {
			&:first-of-type { grid-area: dock; }
			&:last-of-type { grid-area: nav-main; }
		}
		& > main { grid-area: content-main; }
		& > aside { grid-area: sidebar; }
		& > footer { grid-area: footer; }

		/* Backgrounds */
		& > header:first-of-type,
		& > nav,
		& > footer {
			@apply bg-gray-200 dark:bg-gray-900;
		}
		& > header:last-of-type,
		& > main,
		& > aside {
			@apply bg-gray-50 dark:bg-gray-800;
		}

		& > #dock {
			@apply w-20 p-2 flex flex-col items-center
			overflow-y-auto overflow-x-hidden;
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
		& > header {
			@apply flex items-center h-14;
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
		& > nav:last-of-type,
		& > aside {
			@apply w-72;
		}
		& > main:last-of-type {
			@apply flex-1 overflow-y-hidden
			shadow-sm;
		}
	}
</style>
