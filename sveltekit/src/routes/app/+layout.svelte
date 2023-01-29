<script lang="ts">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import type { NavigationItem as NavItem } from '$src/components/controls/Navigation.svelte';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import { goto } from '$app/navigation';
	import Font from '$src/components/branding/Font.svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	
	export let data: LayoutData;

	const _servers: NavItem[] = data.servers.reduce((acc, server) => {
		acc.push({
			title: server.name,
			icon: Icons.Home,
			path: `/app/server/${server.id}/text/${server.text_channel_id}`
		});
		return acc;
	}, [] as NavItem[]);
</script>


	<div id="layout-main">
		<nav id="dock">
			<Button
				variant={ButtonVariant.None}
				on:click={() => goto('/app')}>
				<Font/>
			</Button>
			<Navigation
				match={3}
				pathSelector={item => item.path}
				items={_servers}
				let:item
				let:active
				let:redirect>
				<Button
					variant={ButtonVariant.Card}
					on:click={redirect}
					{active}>
					<Icon name={item.icon} class="large" />
				</Button>
			</Navigation>
			<div class="navigation">
				<NavigationItem
					path="/app/settings"
					match={2}
					let:active
					let:redirect>
					<Button
						variant={ButtonVariant.Card}
						on:click={redirect}
						{active}>
						<Icon name={Icons.Settings} class="large" />
					</Button>
				</NavigationItem>
			</div>
		</nav>
		<slot/>
	</div>


<style global lang="postcss">
	#layout-main {
		@apply h-full flex;

		& > #dock {
			@apply flex-none
			flex flex-col items-center justify-center
			bg-gray-200 dark:bg-gray-900
			border-r
			border-gray-300 dark:border-gray-800;

			& > .button {
				@apply w-full relative h-14
				bg-transparent shadow-none rounded-none
				border-x-0 border-t-0
				border-gray-300 dark:border-gray-800;
				width: calc(100% + 1px);
				& > svg > path {
					@apply fill-accent-500 transition-colors;
				}

				&:hover {
					@apply bg-accent-500 border-accent-500;
					& > svg > path {
						@apply fill-white;
					}
				}
			}

			& > .navigation {
				@apply flex flex-col p-2;
				&:not(:last-child) {
					@apply flex-1;
				}
				& > .button {
					@apply flex-none
					flex items-center justify-center
					w-16 h-16 rounded-lg;
					&:not(:last-child) {
						@apply mb-1;
					}
					&.active {
						@apply rounded-3xl;
						&:hover {
							@apply rounded-lg delay-200;
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
		}

		& > #sidebar > header,
		& > #content > header {
			@apply flex items-center
			border-b h-14;

			& > div {
				@apply flex items-center
				p-2;
				&:first-child {
					@apply flex-1;
				}
				&:last-child {
					@apply flex-none;
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
			@apply flex-none w-80
			flex flex-col;
			& > header {
				@apply border-gray-300 dark:border-gray-800;
			}
			& > main {
				@apply flex-1;
			}
			& > footer {
				@apply border-t border-gray-300 dark:border-gray-800;
			}
			& .grouped-navigation {
				& > .button {
					@apply w-full px-2
					border-x-0 border-b-0 rounded-none
					shadow-none ring-0 ring-offset-0;
					&:focus,
					&:active {
						@apply border-transparent;
						& > .text {
							@apply text-accent-500;
						}
					}
					&:hover {
						@apply border-gray-300 dark:border-gray-800;
					}
					& > .icon {
						@apply text-icon-sec dark:text-icon-dark-sec;
					}
					& > .text {
						@apply text-label uppercase
						text-sec dark:text-dark-sec;
						letter-spacing: .1px;
					}
					&:not(.expanded) {
						& > .icon {
							@apply rotate-180;
						}
					}
				}
			}
			& .navigation {
				@apply flex flex-col px-2;
				&:nth-child(2) {
					@apply my-2;
				}
				& > header {
					@apply flex mb-1;
					& > .button {
						&:first-child {
							@apply flex-1;
							&:hover {
								@apply border-gray-300 dark:border-gray-800;
							}
						}
						&:last-child {
							@apply relative opacity-0 pointer-events-none
							bg-transparent rounded-l-none
							transition-[opacity];
							margin-left: calc(-2.5rem - 2px);
						}
					}
					&:hover > .button:last-child {
						@apply opacity-100 pointer-events-auto
						border-gray-300 dark:border-gray-800;
					}
				}
			}
		}

		& > #content {
			@apply flex-1 flex flex-col
			bg-gray-100 dark:bg-dark-card
			border-l
			border-gray-300 dark:border-gray-700
			shadow-sm;

			& > header {
				@apply border-gray-300 dark:border-gray-700;
			}

			& > main {
				@apply flex-1 h-full overflow-hidden
				flex items-stretch justify-items-stretch;

				& > div {
					@apply p-2;
					&:first-child {
						@apply flex-1;
					}
					&:nth-child(2) {
						@apply flex-none w-80
						border-l
						border-gray-300 dark:border-gray-700;
					}
				}
			}

			& > .footer {
				@apply flex-none border-t border-gray-300 dark:border-gray-700;
			}
		}
	}
</style>
