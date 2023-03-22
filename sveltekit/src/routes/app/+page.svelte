<script lang="typescript">
	import Button from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Gun from 'gun/gun';

	function logout() {
		authenticated.set(false);
		goto('/');
	}
</script>


	<div id="home">
		<h1 class="text heading col-span-2">{$_('routes.app.home.title')}</h1>
	</div>


<style lang="postcss">
	#home {
		@apply min-w-0 grid grid-cols-2 gap-4
    items-center;
	}
</style>
