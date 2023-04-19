<script lang="typescript" context="module">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import type { Icons } from '$src/components/general/Icon.svelte';
	import { type NavItem, default as Navigation } from '$src/components/controls/navigation/Navigation.svelte';
	
	export interface NavGroup {
		title: string;
		icon?: Icons;
		items: NavItem[];
	}
</script>

<script lang="typescript">
	export let items: NavGroup[] = [];
	export let match: number = 0;
	let classes = "";
	export { classes as class };
	export let active: [number, number] = [0, 0];
</script>

<template>
	<div class="navigation-group {classes}">
		{#each items as group, index}
			<p class="text tri bold">{group.title}</p>
			<Navigation
				{match}
				pathSelector={item => item.path}
				items={group.items}
				on:change={(evt) => active = [index, evt.detail.index]}
				let:item
				let:active
				let:redirect>
				<Button
					variant={ButtonVariant.Card}
					text={item.title}
					icon={item.icon}
					on:click={redirect}
					{active}>
				</Button>
			</Navigation>
		{/each}
	</div>
</template>



<style global lang="postcss">
	.navigation-group {
		& > .text {
			@apply px-2 my-1 text-label uppercase;
			&:first-child {
				@apply mt-3;
			}
		}
		& > .navigation {
			@apply ml-[-1px] px-2;
			& > .button {
				@apply w-full px-2;
				&:not(:last-child) {
					@apply mb-[1px];
				}
			}
		}
	}
</style>