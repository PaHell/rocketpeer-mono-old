<script lang="ts" context="module">
	export enum Size {
		Small,
		Medium,
		Large
	}
	
	const classes = [
		'logo-small',
		'logo-medium',
		'logo-large'
	];
</script>
	
<script lang="ts">
	export let size: Size = Size.Medium;
</script>

<template>
	<div class="logo {classes[size]}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<path fill="none" d="M0 0h24v24H0z"/>
			<path d="M5.33 15.929A13.064 13.064 0 0 1 5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 1.01-.114 1.991-.33 2.929l2.02 1.796a.5.5 0 0 1 .097.63l-2.458 4.096a.5.5 0 0 1-.782.096l-2.254-2.254a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.254 2.254a.5.5 0 0 1-.782-.096l-2.458-4.095a.5.5 0 0 1 .097-.631l2.02-1.796zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
		</svg>
	</div>
</template>

<style global lang="postcss">
	.logo {
		@apply flex items-center justify-center;
		& > svg {
			@apply fill-accent-500
			rotate-45 origin-center
			translate-x-[.125rem] translate-y-[-.125rem];
		}

		&.logo-small > svg {
			@apply w-6 h-6;
		}
		&.logo-medium > svg {
			@apply w-8 h-8;
		}
		&.logo-large > svg {
			@apply w-24 h-24;
		}
	}
</style>