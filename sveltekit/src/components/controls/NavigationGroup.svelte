<script lang="typescript" context="module">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import type { NavItem } from '$src/components/controls/Navigation.svelte';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	
	export interface NavGroup {
		title: string;
		icon?: Icons;
		items: NavItem[];
	}
</script>

<script lang="typescript">
	export let items: NavGroup[] = [];
	export let match: number = 0;
	export let variant = ButtonVariant.Transparent;
</script>

<div class="navigation-group">
{#each items as group}
	<p class="text tri bold">{group.title}</p>
	<Navigation
		{match}
		pathSelector={item => item.path}
		items={group.items}
		let:item
		let:active
		let:redirect>
		<Button
			{variant}
			text={item.title}
			icon={item.icon}
			on:click={redirect}
			{active}>
		</Button>
	</Navigation>
{/each}
</div>



<style global lang="postcss">
	.navigation-group {
		& > .text {
			@apply px-2 my-1 text-label uppercase;
			&:first-child {
				@apply mt-2;
			}
		}
		& > .navigation {
			& > .button {
				@apply px-2;
			}
		}
	}
</style>