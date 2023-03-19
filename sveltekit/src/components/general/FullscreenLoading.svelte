<script lang="typescript" context="module">
	import {default as Logo, Size} from '$src/components/Logo.svelte';

</script>

<script lang="typescript">
</script>

<template>
	<div class="fullscreen-loading">
		<div class="logo">
			<Logo size={Size.Large} />
		</div>
		<h1 class="text heading pri">{import.meta.env.VITE_APP_NAME}</h1>
	</div>
</template>

<style global lang="postcss">
	.fullscreen-loading {
		@apply fixed inset-0 z-50
    flex flex-col justify-center items-center
    bg-gray-200 dark:bg-gray-900
    transition-colors duration-300;
		& > .text {
			@apply mt-4;
		}
	}

	.fullscreen-loading > .logo > svg stop {
		stop-color: theme('colors.gray.300');
	}
	.dark .fullscreen-loading > .logo > svg stop {
		stop-color: theme('colors.gray.800');
	}
</style>
