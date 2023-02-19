<script lang="typescript" context="module">
	// import css bootstrap
	import '$src/app.postcss';
	// other imports
	import { initLocale, localeInitialized } from '$lib/i18n';
	import FullscreenLoading from '$comps/general/FullscreenLoading.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { authenticated } from '$src/store';
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import DeveloperTools from "$src/components/DeveloperTools.svelte";
	import MusicPlayer, { playSound, Sounds } from "$src/components/MusicPlayer.svelte";

	const routeAuthed = '/app';
	const routeUnauthed = '/auth';
	export const redirectAuthed = '/app/customers/create';
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
	{#if import.meta.env.DEV}
		<DeveloperTools/>
	{/if}
	{#if $localeInitialized}
		<MusicPlayer/>
		<slot />
	{:else}
		<FullscreenLoading />
	{/if}
</template>


<style global lang="postcss">
</style>
