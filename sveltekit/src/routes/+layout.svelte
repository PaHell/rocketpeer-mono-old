<script lang="ts" context="module">
	// import css bootstrap
	import '$src/app.postcss';
	// other imports
	import { initLocale, localeInitialized } from '$lib/i18n';
	import FullscreenLoading from '$comps/general/FullscreenLoading.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { authenticated } from '$src/store';
	import Button from '$comps/controls/Button.svelte';
	import SelectLanguage from '$comps/controls/selects/SelectLanguage.svelte';
	import Overlay from '$comps/controls/Overlay.svelte';
	import SelectTheme from '$comps/controls/selects/SelectTheme.svelte';
	import { Icons } from '$comps/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';

	const routeAuthed = '/app';
	const routeUnauthed = '/auth';
	export const redirectAuthed = '/app/customers/create';
	export const redirectUnauthed = '/auth/login';
</script>

<script lang="ts">
	let refDevTools: Overlay;
	let devToolsOpened = false;
	initLocale();

	onMount(() => {
		if (!browser) return;
		if (window.location.pathname === '/') {
			goto(redirectUnauthed);
			return;
		}
		onNavigate(window.location.pathname);
	});

	beforeNavigate((nav: BeforeNavigate) => {
		console.log('beforeNavigate', nav);
		if (!nav.to) return;
		onNavigate(nav.to.url.pathname);
	});

	function onNavigate(url: string) {
		if (true || !browser) return;
		console.log('onNavigate', url);
		if (url.startsWith(routeAuthed) && !$authenticated) {
			goto(redirectUnauthed);
		} else if (url.startsWith(routeUnauthed) && $authenticated) {
			goto(redirectAuthed);
		} else {
			console.log('no redirect');
		}
	}
</script>


	{#if import.meta.env.DEV}
		<Overlay
			bind:this={refDevTools}
			bind:opened={devToolsOpened}
			position="bottom-end"
			class="overlay-dev-tools"
		>
			<svelte:fragment slot="item">
				<Button icon={Icons.DevTools} active={devToolsOpened} on:click={refDevTools.toggleOpened} />
			</svelte:fragment>
			<svelte:fragment slot="menu">
				<p class="text text-center">{$_('routes.dev_tools')}</p>
				<SelectTheme />
				<SelectLanguage />
			</svelte:fragment>
		</Overlay>
	{/if}
	{#if $localeInitialized}
		<slot />
	{:else}
		<FullscreenLoading />
	{/if}


<style global lang="postcss">
	.overlay-dev-tools {
		@apply fixed right-4 z-40;
		top: calc((100% - 2.5rem) / 2);
		& > menu > main {
			@apply space-y-2
      		p-2 overflow-auto;
		}
	}
</style>
