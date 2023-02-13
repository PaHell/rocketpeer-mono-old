<script lang="typescript" context="module">
	import Logo from '$comps/branding/Logo.svelte';
</script>

<script lang="typescript">
</script>


	<div class="fullscreen-loading">
		<div class="logo">
			<Logo />
		</div>
		<h1 class="text heading">{import.meta.env.VITE_APP_NAME}</h1>
	</div>


<style global lang="postcss">
	.fullscreen-loading {
		@apply fixed inset-0 z-50
    flex flex-col justify-center items-center
    bg-gray-200 dark:bg-gray-900
    transition-colors duration-300;
		& > .logo {
			@apply w-32 rounded overflow-hidden
      border border-gray-300 dark:border-gray-800
      bg-gray-200 dark:bg-gray-900;
			& > svg {
				@apply w-full h-auto;

				& > #square {
				}
				& > #text {
					@apply fill-gray-200 dark:fill-gray-900;
				}
			}
		}
		& > .text {
			@apply mt-4 text-gray-300 dark:text-gray-800;
		}
	}

	.fullscreen-loading > .logo > svg stop {
		stop-color: theme('colors.gray.300');
	}
	.dark .fullscreen-loading > .logo > svg stop {
		stop-color: theme('colors.gray.800');
	}
</style>
