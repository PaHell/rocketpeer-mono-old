<script>
    import { page } from '$app/stores';
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import RequestError from '$src/components/templates/RequestError.svelte';
	import { load } from './+page';
	import { _ } from 'svelte-i18n';
</script>

<template>
    <RequestError
		error={$page.error}
		on:retry={() => {}}
		on:reload={() => {}}/>
</template>

<style global lang="postcss">
</style>