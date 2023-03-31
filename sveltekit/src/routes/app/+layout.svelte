<script lang="typescript">
	import Button, { ButtonAlignment, ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	import { onMount, type ComponentEvents } from 'svelte';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import type { NavItem } from '$src/components/controls/navigation/Navigation.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import ImageIcon from '$src/components/views/ImageIcon.svelte';
	import Navigation from '$src/components/controls/navigation/Navigation.svelte';
	
	export let data: LayoutData;
	data.server_users = data.server_users.sort((a, b) => a.order - b.order);

	let refIndicator: HTMLElement;

	onMount(() => {
	});

	function updateIndicator(evt: CustomEvent<ComponentEvents<Navigation<App.DB.ServerUser>>["change"]>) {
		if (!refIndicator) return;
		console.log(evt.detail.index, refIndicator);
		if (evt.detail.index === -1) {
			refIndicator.style.top = "1.75rem";
			return;
		}
		refIndicator.style.top = `${evt.detail.index * 4.25 + 7}rem`;
	}
</script>

<template>
	<div id="layout-app" class="layout-pane row items-stretch">
		<nav id="dock" class={$connectedVoiceChannel ? 'padded' : ''}>
			<div id="indicator" bind:this={refIndicator}></div>
			<NavigationItem
				path="/app/messages/friends/all"
				match={2}
				let:active
				let:redirect>
				<Button
					variant={ButtonVariant.Card}
					align={ButtonAlignment.Center}
					class="branding"
					{active}
					on:click={redirect}>
					<Logo/>
				</Button>
			</NavigationItem>
			<hr/>
			<Navigation
				items={data.server_users}
				pathSelector={i => `/app/servers/${i.id}/text/${i._server.text_channel_id}`}
				match={3}
				on:change={updateIndicator}
				let:active
				let:redirect
				let:item>
				<Button
					variant={ButtonVariant.Card}
					align={ButtonAlignment.Center}
					on:click={redirect}
					{active}>
					<ImageIcon
						src={item._server.image}
						alt={item._server.name}
						placeholder={Icons.Home}/>
				</Button>
			</Navigation>
			<hr/>
			<Button
				icon={Icons.Add}
				variant={ButtonVariant.Card}
				align={ButtonAlignment.Center}
				class="create-join"/>
			<NavigationItem
				path="/app/settings"
				let:active
				let:redirect>
				<Button
					icon={Icons.Settings}
					variant={ButtonVariant.Card}
					align={ButtonAlignment.Center}
					class="settings"
					{active}
					on:click={redirect}/>
			</NavigationItem>
		</nav>
		<slot/>
	</div>
</template>

<style global lang="postcss">
	#layout-app.layout-pane {
		& > nav#dock {
			@apply w-20 p-2 flex flex-col items-stretch
			border-r overflow-y-auto overflow-x-hidden
			border-gray-300 dark:border-gray-800;
			&.padded {
				padding-bottom: calc(7.5rem + 2px);
			}
			& > hr {
				@apply w-8 mx-auto my-2
				border-t-2 border-gray-300 dark:border-gray-800;
			}
			& > #indicator {
				@apply absolute top-0 left-0 w-1 h-6
				bg-accent-500 dark:bg-gray-300 rounded-r
				transition-[top] duration-200 ease-in-out;
			}
			& .button {
				@apply flex-none
				w-16 h-16 p-0
				rounded-full
				bg-gray-200 dark:bg-gray-800
				transition-all duration-200 ease-linear;
				will-change: border-radius;
				&:not(:last-child) {
					@apply mb-1;
				}
				& .icon {
					@apply w-full text-icon-large;
				}
				& > .image-icon {
					@apply w-full h-full rounded-[inherit];
				}
				&:hover,
				&.active {
					@apply rounded-2xl;
					& > svg > path {
						@apply fill-white;
					}
				}
				&.active {
					& > .icon {
						@apply text-accent-500;
					}
				}
				&.branding {
					@apply mb-0;
				}
				&.settings {
					@apply mt-auto;
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
				& > .navigation-group {
					@apply ml-2;
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
