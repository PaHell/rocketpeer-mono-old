<script lang="typescript" context="module">
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import Button, { ButtonVariant } from '../controls/Button.svelte';
	export enum AlertVariant {
		Success,
		Warning,
		Danger,
		Info,
	}
	const alert_icons: Icons[] = [
		Icons.CheckCircle,
		Icons.WarningTriangle,
		Icons.ExclamationCircle,
		Icons.InfoCircle,
	];
	const alert_classes: string[] = [
		"success",
		"warning",
		"danger",
		"info"
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
	export let small = false;

	function dismiss() {

	}
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
			<Button
				variant={ButtonVariant.Transparent}
				icon={Icons.Close}
				on:click={dismiss}/>
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
        rounded bg-gray-100
		transition-all;

		& > * {
			@apply scale-0 opacity-50 origin-left;
			animation: alert 0.4s ease-in-out forwards;
		}

		& .button > .text,
		& .button > .icon {
			@apply text-inherit !important;
		}

		& > div {
			@apply flex-1 mb-[.5px];

			&.header {
				@apply flex justify-center items-center h-10;
				& > .icon {
					@apply w-10 text-center;
				}
				& > .text {
					@apply flex-1;
					&:first-child {
						@apply pl-2;
					}
				}
			}

			&.main {
				@apply flex flex-col
				justify-center items-start
				-mt-2;
			}
		}
		& > .indent {
			@apply pl-10;
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
		&.alert-info {
			@apply bg-accent-100
			dark:bg-accent-500 dark:bg-opacity-[12%]
			text-accent-500;
		}
	}

	@keyframes alert {
		to {
			@apply scale-100 opacity-100;
		}
	}
</style>
