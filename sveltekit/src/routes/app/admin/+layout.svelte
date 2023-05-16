<script lang="typescript">
	import { Icons } from '$src/components/general/Icon.svelte';
	import { default as GroupedNavigation, type NavGroup } from '$src/components/controls/navigation/GroupedNavigation.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const categories: NavGroup[] = [
		{
			title: 'routes.app.admin.title',
			items: [
				{
					title: 'Users',
					icon: Icons.User,
					path: '/app/admin/users'
				}
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
<slot />


<style global lang="postcss">
</style>
