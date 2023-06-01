<script lang="typescript">
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { default as GroupedNavigation, type NavGroup } from '$src/components/controls/navigation/GroupedNavigation.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const categories: NavGroup[] = [
		{
			title: 'Models',
			items: [
				{
					title: 'Users',
					icon: Icons.User,
					path: '/app/admin/users'
				},
			]
		},
		{
			title: 'User Interface',
			items: [
				{
					title: 'Buttons',
					icon: Icons.User,
					path: '/app/admin/ui/button'
				},
				{
					title: 'Inputs',
					icon: Icons.User,
					path: '/app/admin/ui/input'
				},
				{
					title: 'Navigation',
					icon: Icons.User,
					path: '/app/admin/ui/navigation'
				},
				{
					title: 'Tables',
					icon: Icons.User,
					path: '/app/admin/ui/table'
				},
			]
		},
	];
</script>


<header>
	<div>
		<p class="text font-bold">Admin Panel</p>
	</div>
	<div>
	</div>
</header>
<nav>
	<GroupedNavigation
		items={categories}
		class="fill"/>
</nav>
<header>
	<div>
		<Icon name={Icons.User} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">Users</p>
	</div>
	<div>
	</div>
</header>
<slot />


<style global lang="postcss">
</style>
