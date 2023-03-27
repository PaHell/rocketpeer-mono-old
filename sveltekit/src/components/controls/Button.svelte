<script lang="typescript" context="module">
	import { _ } from 'svelte-i18n';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	export enum ButtonVariant {
		Primary = 'button-pri',
		Secondary = 'button-sec',
		Transparent = 'button-trans',
		Card = 'button-card',
		None = '',
	}
	export enum ButtonAlignment {
		Left = 'button-left',
		Center = 'button-center',
		Right = 'button-right',
	}
</script>

<script lang="typescript">
	export let text: string | undefined = undefined;
	export let icon: Icons | undefined = undefined;
	export let variant: ButtonVariant = ButtonVariant.Secondary;
	export let disabled: boolean = false;
	export let active: boolean = false;
	let classes: string = '';
	export { classes as class };
	export let disableTabIndex: boolean = false;
	export let align: ButtonAlignment = ButtonAlignment.Left;
</script>


	<button
		on:click
		type="button"
		{disabled}
		class:active
		class="button {variant} {align} {classes}"
		tabindex={disabled || disableTabIndex ? -1 : 0}
	>
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if text}
			<p class="text">{$_(text)}</p>
		{/if}
		<slot />
	</button>


<style global lang="postcss">
	.button {
		@apply flex items-center justify-start flex-shrink-0
        h-10 px-3 border rounded font-medium
        select-none outline-0
		transition-all;
		/* CONTENT LAYOUT */
		& * {
			@apply border-inherit text-inherit transition-colors;
		}
		& > *:not(:last-child) {
			@apply mr-1;
		}
		& > .icon {
			&:first-child:last-child {
				@apply -mx-1;
			}
		}
		& > .text {
			@apply mb-[.5px] text-control
			overflow-ellipsis whitespace-nowrap overflow-hidden
			text-left;
		}
		& > .icon:first-child + .text:last-child {
			@apply mr-[4px];
		}
		/* ALIGNMENT */
		&.button-center {
			@apply justify-center;
		}
		&.button-right {
			@apply flex-row-reverse;
			& > * {
				&:not(:last-child) {
					@apply mr-0 ml-1;
				}
			}
			& > .text {
				@apply text-right;
			}
			& > .icon {
			}
		}
		/* LIFT WHEN FOCUSED/ACTIVE */
		&.active,
		&:focus,
		&:active {
			@apply relative;
		}
		/* FOCUS RING */
		&.button-pri,
		&.button-sec {
			&:focus {
				@apply shadow-inner ring-2 ring-accent-500
				ring-offset-0;
				@apply border-transparent !important;
			}
		}
		/* SHADOW */
		&.button-pri,
		&.button-sec {	
			@apply shadow-sm;
			&.active {
				@apply shadow-sm;
			}
			&:hover {
				@apply shadow;
			}
			&:active {
				@apply shadow-inner;
			}
		}
		/* TEXT/ICON STYLES */
		&.button-sec,
		&.button-trans,
		&.button-card {
			& > .text {
				@apply text-sec dark:text-dark-sec;
			}
			& > .icon {
				@apply text-icon-sec dark:text-icon-dark-sec;
			}
			&:hover,
			&:focus,
			&:active {
				& > .text {
					@apply text-pri dark:text-dark-pri;
				}
				& > .icon {
					@apply text-icon-pri dark:text-icon-dark-pri;
				}
			}

			&.active {
				& > .text {
					@apply text-accent-600 dark:text-accent-400;
				}
				& > .icon {
					@apply text-accent-500 dark:text-accent-500;
				}
			}
		}
		/* PRIMARY */
		&.button-pri {
			@apply bg-accent-500 border-accent-600
      		dark:bg-accent-600 dark:border-accent-500;
			& > * {
				@apply text-white dark:text-white;
			}
			&:hover {
				@apply bg-accent-400 border-accent-500 dark:bg-accent-500 dark:border-accent-400;
			}
			&:active {
				@apply bg-accent-600 border-accent-600 dark:bg-accent-400 dark:border-accent-400;
			}
		}
		/* SECONDARY */
		&.button-sec {
			@apply bg-white border-gray-300
			dark:bg-gray-800 dark:border-gray-700;
		}
		/* TRANSPARENT */
		&.button-trans,
		&.button-card {
			@apply bg-transparent border-transparent;
			&:hover,
			&:focus {
				@apply bg-gray-200 border-gray-300
	  			dark:bg-gray-800 dark:border-gray-700;
			}
			&:active {
				@apply bg-gray-300 dark:bg-gray-800;
			}
		}
		/* CARD */
		&.button-card {
			&.active {
				@apply shadow-sm
				bg-white dark:bg-gray-800
				border-gray-300 dark:border-gray-700;
			}
		}
		/* DISABLED */
		&:disabled {
			@apply pointer-events-none;
			@apply shadow-none
			bg-gray-200 border-gray-300
			dark:bg-gray-900 dark:border-gray-900 !important;
			& > .text {
				@apply text-tri dark:text-dark-tri !important;
			}
			& > .icon {
				@apply text-icon-tri dark:text-icon-dark-tri !important;
			}
		}
	}
</style>
