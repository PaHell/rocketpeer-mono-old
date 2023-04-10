<script lang="typescript" context="module">
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	export enum AlertVariant {
		Success,
		Warning,
		Danger,
	}
	const alert_icons: Icons[] = [
		Icons.CheckCircle,
		Icons.WarningTriangle,
		Icons.ExclamationCircle,
	];
	const alert_classes: string[] = [
		"success",
		"warning",
		"danger",
	];
</script>

<script lang="typescript">
	export let variant: AlertVariant = AlertVariant.Success;
	export let icon: Icons | undefined = undefined;
	export let title: string | undefined = undefined;
	export let message: string | undefined = undefined;
	export let messages: string[] = [];
	let classes = '';
	export {classes as class};
	
	export let small: boolean = false;
</script>

<template>
	<div
		class="alert alert-{alert_classes[variant]} {classes}"
		class:alert-small={small}>
		<div class="header">
			<Icon name={icon ?? alert_icons[variant]} />
			{#if title}
				<p class="text bold ellipsis">{$_(title)}</p>
			{/if}
		</div>
		<div class="main indent">
			{#if message}
				<p class="text">{$_(message)}</p>
			{/if}
			{#each messages as msg}
				<p class="text">{$_(msg)}</p>
			{/each}
		</div>
		<slot />
	</div>
</template>

<style global lang="postcss">
	.alert {
		@apply flex-shrink-0
        p-2 rounded bg-gray-100
		transition-all;

		& > * {
			@apply scale-0 opacity-50 origin-left;
			animation: alert 0.4s ease-in-out forwards;
			&:not(:last-child) {
				@apply mr-1;
			}
		}

		& > div {
			@apply flex-1 mb-[.5px];

			&.header {
				@apply flex justify-center;
				& > .text {
					@apply flex-1;
					&:not(:first-child) {
						@apply ml-1;
					}
				}
			}

			&.main {
				@apply flex flex-col
				justify-center items-start;
			}
		}
		& > .indent {
			padding-left: calc(24px + .25rem);
		}

		&.alert-transparent {
			@apply bg-transparent dark:bg-transparent;
		}

		&.alert-small {
			@apply p-1;
			& > div {
				@apply text-xs;
				& > .icon {
					@apply text-[18px];
				}
			}
			& > .indent {
				padding-left: calc(18px + .25rem);
			}
		}

		&.alert-success {
			@apply bg-success-100
			dark:bg-success-500 dark:bg-opacity-[12%]
			text-success-500;
		}
		&.alert-warning {
			@apply bg-warning-100
			dark:bg-warning-500 dark:bg-opacity-[12%]
			text-warning-500;
		}
		&.alert-danger {
			@apply bg-danger-100
			dark:bg-danger-500 dark:bg-opacity-[12%]
			text-danger-500;
		}
	}

	@keyframes alert {
		to {
			@apply scale-100 opacity-100;
		}
	}
</style>
