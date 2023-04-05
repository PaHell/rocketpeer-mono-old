<script lang="typescript">
	import Button from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';
</script>


<template>
	<header>
		<div>
			<Icon name={Icons.DevTools} class="text-icon-sec dark:text-icon-dark-sec"/>
			<p class="text text-headline ellipsis">Welcome Admin</p>
		</div>
		<div>
		</div>
	</header>
	<main>
		<div class="p-2">
		</div>
	</main>
</template>


<style lang="postcss">
</style>