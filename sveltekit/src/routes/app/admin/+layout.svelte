<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { onMount } from 'svelte';
	import { mobile } from '$src/lib/viewSize';
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import { NavStyle, type NavGroup } from '$src/components/controls/navigation/StyledNavigation.svelte';
	import StyledNavigation from '$src/components/controls/navigation/StyledNavigation.svelte';

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


<nav id="sidebar">
	<header>
		<div>
			<p class="text font-bold">Admin Panel</p>
		</div>
		<div>
		</div>
	</header>
	<StyledNavigation
		items={categories}
		style={NavStyle.List}
		/>
</nav>
<div id="content">
	<slot />
</div>


<style global lang="postcss">
</style>
