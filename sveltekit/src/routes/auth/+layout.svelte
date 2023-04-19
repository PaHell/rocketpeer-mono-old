<script lang="typescript">
	import Logo from '$src/components/Logo.svelte';
	import Copyright from "$src/components/templates/Copyright.svelte";
</script>

<template>
	<div id="layout-auth">
		<aside>
			<header>
				<Logo />
				<p class="text headline secondary">{import.meta.env.VITE_APP_NAME}</p>
			</header>
			<main>
				<slot />
			</main>
			<footer>
				<p class="text tri">Version {import.meta.env.VITE_APP_VERSION}</p>
				<Copyright/>
			</footer>
		</aside>
		<div>
			<img src="/img/bg-auth-3.png" alt="Authentication" />
		</div>
	</div>
</template>

<style global lang="postcss">
	#layout-auth {
		@apply flex-1 flex h-full;
		& > aside {
			@apply flex flex-col relative
				w-full md:max-w-md shadow-lg
				overflow-x-hidden overflow-y-auto
				md:border-r border-gray-300 dark:border-gray-700
				bg-gray-50 dark:bg-gray-800;
				& > * {
					@apply px-8 py-4;
				}
				& > header {
					@apply flex flex-col items-center
					space-y-2 py-4
					border-b border-gray-300 dark:border-gray-700
					bg-gray-100 dark:bg-gray-800;
				}
				& > main {
					@apply flex-1 flex flex-col space-y-4;
				}
				& > footer {
					@apply text-center;
				}
		}
		& > div {
			@apply flex-1 overflow-hidden bg-black;
			& > img {
				@apply object-cover object-center
				min-w-full min-h-full
				md:block hidden
				opacity-40;
			}
		}
	}
</style>
