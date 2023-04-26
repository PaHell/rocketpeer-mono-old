<script lang="typescript" context="module">
	// import css bootstrap
	import '$src/app.postcss';
	// other imports
	import { initLocale, localeInitialized } from '$src/lib/i18n';
	import FullscreenLoading from '$src/components/general/FullscreenLoading.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { BeforeNavigate } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { authenticated } from '$src/store';
	import { browser } from '$app/environment';
	import DeveloperTools from "$src/components/controls/DeveloperTools.svelte";
	import MusicPlayer from "$src/components/controls/MusicPlayer.svelte";

	const routeAuthed = '/app';
	const routeUnauthed = '/auth';
	export const redirectAuthed = '/app';
	export const redirectUnauthed = '/auth/login';
</script>

<script lang="typescript">

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

<template>
	{#if $localeInitialized}
		{#if import.meta.env.DEV}
			<DeveloperTools/>
		{/if}
		<MusicPlayer/>
		<slot />
	{:else}
		<FullscreenLoading />
	{/if}
</template>


<style global lang="postcss">
</style>
