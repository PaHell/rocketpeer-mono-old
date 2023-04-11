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
	import VoiceConnection from '$src/components/views/VoiceConnection.svelte';
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


<nav id="sidebar" class="layout-pane items-stretch">
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
		class="fill"
		/>
	<VoiceConnection user={data.user}/>
</nav>
<div id="content">
	<slot />
</div>


<style global lang="postcss">
</style>
