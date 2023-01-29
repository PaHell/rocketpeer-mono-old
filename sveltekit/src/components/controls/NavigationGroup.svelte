<script lang="ts" context="module">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import type { NavItem } from '$src/components/controls/Navigation.svelte';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import { goto } from '$app/navigation';
	import Font from '$src/components/branding/Font.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	
	export interface NavGroup {
		title: string;
		icon?: Icons;
		items: NavItem[];
	}
</script>

<script lang="ts">
	export let items: NavGroup[] = [];
	export let match: number = 0;
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
			variant={ButtonVariant.Card}
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