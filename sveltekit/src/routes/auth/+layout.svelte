<script lang="typescript">
	import { goto } from '$app/navigation';
	import Font from '$comps/branding/Font.svelte';
	import Copyright from "$comps/templates/Copyright.svelte";
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
</script>


	<div id="layout-auth">
		<header>
			<Font />
			<p class="text headline secondary">{import.meta.env.VITE_APP_NAME}</p>
		</header>
		<main>
			<slot />
			<Button variant={ButtonVariant.Secondary}
			icon={Icons.Home}
			text="Go to home"
			class="mt-4"
			on:click={() => goto("/app")}/>
		</main>
		<footer>
			<Copyright/>
		</footer>
	</div>


<style global lang="postcss">
	#layout-auth {
		@apply flex-1 flex flex-col justify-center items-center;
		& > header {
			@apply flex flex-col items-center space-y-2;
			& > svg {
				@apply h-12;
				& > path {
					@apply fill-accent-500;
				}
			}
		}
		& > main {
			@apply flex flex-col
				w-full max-w-md p-8 my-6
				rounded-lg shadow-lg
				border border-gray-300 dark:border-gray-700
				bg-gray-50 dark:bg-gray-800;
		}
		& > footer {
			@apply text-center;
		}
	}
</style>
