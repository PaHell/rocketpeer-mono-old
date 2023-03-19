<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import { onMount } from 'svelte';
	import { mobile } from '$lib/viewSize';
	import type { NavItem } from '$src/components/controls/Navigation.svelte';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import type { NavGroup } from '$src/components/controls/NavigationGroup.svelte';
	import NavigationGroup from '$src/components/controls/NavigationGroup.svelte';

	const categories: NavGroup[] = [
		{
			title: 'routes.app.settings.title',
			items: [
				{
					title: 'routes.app.settings.title',
					icon: Icons.Settings,
					path: '/app/settings'
				}
			]
		},
	];
</script>


<nav id="sidebar">
	<header>
		<div>
			<p class="text font-bold">Settings</p>
		</div>
		<div>
		</div>
	</header>
	<NavigationGroup items={categories}/>
</nav>
<div id="content">
	<header>
		<div>
			<Icon name={Icons.Settings} class="text-icon-sec dark:text-icon-dark-sec"/>
			<p class="text text-headline ellipsis">Settings</p>
		</div>
		<div>
		</div>
	</header>
	<main>
		<div>
			<slot />
		</div>
	</main>
</div>


<style global lang="postcss">
</style>
