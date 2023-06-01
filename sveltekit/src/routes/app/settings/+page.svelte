<script lang="typescript">
	import SelectViewSize from '$src/components/controls/selects/SelectViewSize.svelte';
	import SelectLanguage from '$src/components/controls/selects/SelectLanguage.svelte';
	import SelectTheme from '$src/components/controls/selects/SelectTheme.svelte';
	import Button from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';

	function logout() {
		authenticated.set(false);
		goto('/');
	}
</script>

<template>
	<main id="settings">
		<div>
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
	</main>
</template>

<style lang="postcss">
	#settings {
		@apply p-2;
		& > div {
			@apply min-w-0 grid grid-cols-2 gap-4
			items-center self-start;
		}
	}
</style>
