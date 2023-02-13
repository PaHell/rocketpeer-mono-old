<script lang="typescript" context="module">
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	export enum BadgeVariant {
        Primary = 'primary',
        Secondary = '',
		Success = 'success',
		Warning = 'warning',
		Danger = 'danger'
	}
    export enum BadgeSize {
        Small = 'small',
        Normal = '',
    }
</script>

<script lang="typescript">
    export let icon: Icons | undefined = undefined;
	export let text: string = "";
    export {classes as class};
    let classes = "";
    export let variant: BadgeVariant = BadgeVariant.Secondary;
    export let size: BadgeSize = BadgeSize.Normal;
</script>


	<div class="badge badge-{variant} badge-{size} {classes}">
		{#if icon}
			<Icon name={icon} />
		{/if}
		<p class="text">{$_(text)}</p>
	</div>


<style global lang="postcss">
	.badge {
		@apply flex items-start justify-center flex-shrink-0
        px-[0.3rem] py-[0.2rem] rounded
        bg-gray-400 dark:bg-gray-900
        text-white
		transition-all;

        & > * {
            @apply text-inherit;
        }

        & > .text {
            @apply mb-[1px]
			uppercase text-label
			font-bold leading-none;
            letter-spacing: 0.25px;
        }

        &.badge-primary {
			@apply bg-accent-500;
		}
        &.badge-success {
			@apply bg-success-500;
		}
        &.badge-warning {
			@apply bg-warning-500;
		}
		&.badge-danger {
			@apply bg-danger-500;
		}
	}

	@keyframes alert {
		to {
			@apply scale-100 opacity-100;
		}
	}
</style>
