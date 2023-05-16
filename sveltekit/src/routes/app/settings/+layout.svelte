<script lang="typescript">
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import GroupedNavigation, { type NavGroup } from '$src/components/controls/navigation/GroupedNavigation.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const categories: NavGroup[] = [
		{
			title: 'routes.app.settings.application.title',
			items: [
				{
					title: 'routes.app.settings.application.title',
					icon: Icons.Settings,
					path: '/app/settings'
				}
			]
		},
		{
			title: 'routes.app.settings.ui.title',
			items: [
				{
					title: 'routes.app.settings.ui.buttons.title',
					icon: Icons.Settings,
					path: '/app/settings/ui/buttons'
				}
			]
		},
	];
</script>

<template>
	<header>
		<div>
			<p class="text font-bold">Settings</p>
		</div>
		<div>
		</div>
	</header>
	<nav>
		<GroupedNavigation
			items={categories}
			class="fill"
			/>
	</nav>
	<header>
		<div>
			<Icon name={Icons.Settings} class="text-icon-sec dark:text-icon-dark-sec"/>
			<p class="text text-headline ellipsis">Settings</p>
		</div>
		<div>
		</div>
	</header>
	<slot />
</template>


<style global lang="postcss">
</style>
