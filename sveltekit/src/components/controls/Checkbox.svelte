<script lang="typescript" strictEvents>
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	interface $$Events {
		change: void;
	}

	export let value = false;
	export let icon: Icons | undefined = undefined;
	export let text: string | undefined = undefined;
	export let css = '';
	export let disabled = false;
	export let isToggle = false;

	const dispatch = createEventDispatcher<$$Events>();

	function toggle() {
		value = !value;
		dispatch('change');
	}
</script>


	<Button
		variant={ButtonVariant.Transparent}
		class="checkbox {css}"
		active={value}
		{disabled}
		on:click={toggle}
	>
		{#if !isToggle}
			<div class="switch">
				<Icon name={Icons.SelectSelected} class={value ? 'active' : ''} />
			</div>
		{/if}
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if text}
			<p class="text">{text}</p>
		{/if}
		<slot />
		{#if isToggle}
			<div class="toggle" />
		{/if}
	</Button>


<style global lang="postcss">
	.checkbox.button.button-trans {
		& > .text {
			@apply text-sec dark:text-dark-sec;
		}
		& > .icon {
			@apply text-icon-sec dark:text-icon-dark-sec;
			&:nth-child(2) {
				@apply ml-1;
			}
		}
		&:hover,
		&:focus {
			@apply bg-gray-200 border-gray-300
      dark:bg-gray-800 dark:border-gray-700;
		}
		&:active {
			@apply bg-gray-300 border-gray-400
      dark:bg-gray-700 dark:border-gray-700;
			& > .switch {
				@apply dark:bg-gray-700 dark:border-gray-500;
			}
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
		& > .switch {
			@apply w-4 h-4 ml-1 mr-2
      flex items-center
      border rounded shadow-sm
      border-gray-300 bg-gray-50
      dark:border-gray-700 dark:bg-gray-800
      transition-colors;
			& > .icon {
				@apply indent-[-2px] text-accent-500
        scale-0 rotate-90
        origin-left transition-transform duration-100;
			}
		}
		& > .toggle {
			@apply w-9 h-3
      flex items-center
      bg-gray-700 rounded-full
      transition-colors;
			&::before {
				content: '';
				@apply block w-5 h-5
        border-gray-800 border
        bg-gray-800 rounded-full
        transition-all;
				will-change: margin;
			}
		}

		&:hover {
			& > .toggle {
				@apply bg-gray-800;
			}
		}

		&.active {
			& > .switch {
				& > .icon {
					@apply scale-100 rotate-0;
				}
			}
			& > .toggle {
				&:before {
					@apply ml-4 bg-accent-500 border-accent-400;
				}
			}
		}
	}
</style>
