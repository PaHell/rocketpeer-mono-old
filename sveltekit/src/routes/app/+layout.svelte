<script lang="typescript">
	import Button, { ButtonAlignment, ButtonStyle, ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import type { NavItem } from '$src/components/controls/Navigation.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import ImageIcon from '$src/components/views/ImageIcon.svelte';
	
	export let data: LayoutData;
	data.userServers = data.userServers.sort((a, b) => a.order - b.order);
</script>

<template>
	<div id="layout-app" class="layout-pane row items-stretch">
		<nav class="layout-pane {$connectedVoiceChannel ? 'padded' : ''}">
			<div>
				<NavigationItem
					path={'/app/messages/2/text'}
					match={2}
					let:active
					let:redirect>
					<Button
						variant={ButtonVariant.Transparent}
						style={ButtonStyle.Card}
						align={ButtonAlignment.Center}
						class="branding"
						{active}
						on:click={redirect}>
						<Logo/>
					</Button>
				</NavigationItem>
			</div>
			<div id="servers" class="fill">
				{#each data.userServers as item (item.id)}
					{#if item._server}
						<NavigationItem
							path={`/app/servers/${item.id}/text/${item._server.text_channel_id}`}
							match={3}
							let:active
							let:redirect>
								<Button
									variant={ButtonVariant.Transparent}
									style={ButtonStyle.Card}
									align={ButtonAlignment.Center}
									on:click={redirect}
									{active}>
									<Icon name={item._server.image} class="large" />
								</Button>
						</NavigationItem>
					{/if}
				{/each}
			</div>
		</nav>
		<slot/>
	</div>
</template>

<style global lang="postcss">
	#layout-app.layout-pane {
		& > nav {
			@apply w-20 p-2 items-stretch
			border-r overflow-y-auto overflow-x-hidden
			border-gray-300 dark:border-gray-800;
			&.padded {
				padding-bottom: calc(7.5rem + 2px);
			}
			& > .button {
				@apply flex-none
				w-16 h-16 p-0
				rounded-lg;
				&:not(:last-child) {
					@apply mb-1;
				}
				& .icon {
					@apply text-icon-large;
				}
				& > .icon,
				& > .image-icon {
					@apply w-full h-full;
				}
				& > .image-icon {
					@apply rounded-[inherit];
				}
				&:hover,
				&.active {
					& > svg > path {
						@apply fill-white;
					}
				}
				&.active {
					@apply rounded-3xl;
					&:hover {
						@apply rounded-lg delay-200;
					}
					& > .icon {
						@apply text-accent-500;
					}
				}
				&:not(.active) {
					@apply rounded-lg;
					&:hover {
						@apply rounded-3xl;
					}
				}
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
			}
		}
		& > #sidebar {
			@apply w-72 ml-[-1px]
			border-x border-l
			border-gray-300 dark:border-gray-800;
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
