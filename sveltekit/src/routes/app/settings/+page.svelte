<script lang="ts">
	import SelectViewSize from '$comps/controls/selects/SelectViewSize.svelte';
	import SelectLanguage from '$comps/controls/selects/SelectLanguage.svelte';
	import SelectTheme from '$comps/controls/selects/SelectTheme.svelte';
	import Button from '$comps/controls/Button.svelte';
	import { Icons } from '$comps/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';

	function logout() {
		authenticated.set(false);
		goto('/');
	}
</script>


	<div id="settings">
		<h1 class="text heading col-span-2">{$_('routes.app.settings.title')}</h1>
		<h2 class="text headline col-span-2">{$_('routes.app.settings.general')}</h2>
		<SelectLanguage />
		{#if $authenticated}
			<div>
				<p class="text label">&nbsp;</p>
				<Button
					icon={Icons.Logout}
					text="routes.app.settings.logout"
					class="w-full"
					on:click={logout}
				/>
			</div>
		{/if}
		<h2 class="text headline col-span-2">{$_('routes.app.settings.appearance')}</h2>
		<SelectTheme />
		<SelectViewSize />
	</div>


<style lang="postcss">
	#settings {
		@apply flex-1 min-w-0 grid grid-cols-2 gap-4
    items-center;
	}
</style>
