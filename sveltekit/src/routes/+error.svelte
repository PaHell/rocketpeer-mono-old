<script>
    import { page } from '$app/stores';
	import RequestError from '$src/components/templates/RequestError.svelte';
</script>

<template>
    <RequestError error={$page.error}/>
</template>

<style global lang="postcss">
</style>