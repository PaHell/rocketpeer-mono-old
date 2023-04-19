<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { onMount } from 'svelte';
	import { mobile } from '$src/lib/viewSize';
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import GroupedNavigation, { type NavGroup } from '$src/components/controls/navigation/GroupedNavigation.svelte';
	import VoiceConnection from '$src/components/views/VoiceConnection.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

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


<nav id="sidebar" class="layout-pane items-stretch">
	<header>
		<div>
			<p class="text font-bold">Settings</p>
		</div>
		<div>
		</div>
	</header>
	<GroupedNavigation
		items={categories}
		class="fill"
		/>
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
		<div class="p-2">
			<slot />
		</div>
	</main>
</div>


<style global lang="postcss">
</style>
