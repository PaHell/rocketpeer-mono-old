<script lang="typescript" context="module">
	import { arrow, autoUpdate, computePosition, flip, inline, offset, shift, type Placement, type Platform, type Strategy, autoPlacement, size} from '@floating-ui/dom';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { debounce } from '$src/lib/helpers';
	import { clickOutside } from '$src/lib/use';

	let openedContainer: HTMLElement | undefined;

	export enum FloatingAlignment {
        RightLeft,
		BottomTop,
    }
	const alignmentClasses = [
		"align-rl",
		"align-bt",
	];

	interface FloatingContex {
		nested: boolean;
	}
</script>

<script lang="typescript">
	type T = $$Generic<App.DB.PrimaryKey>;
	type FloatingOpeningOptions = { reference?: HTMLElement, context?: T };
	interface $$Slots {
		item: {
			open: (options?: FloatingOpeningOptions) => void;
			toggle: (options?: FloatingOpeningOptions) => void;
			close: () => void;
			opened: boolean;
		};
		menu: {
			close: () => void;
			opened: boolean;
		};
	}
	interface $$Events {
		open: void;
		close: HTMLElement;
	}
	
	export let alignment: FloatingAlignment = FloatingAlignment.BottomTop;
	let classes = '';
	export { classes as class };
	export let lazy = false;
	export let currentContext: T | undefined = undefined;
	
	let opened = false;
	let initialized = false;
	let render = !lazy;
	let placement: Placement = "right";
	$: placement = alignment === FloatingAlignment.RightLeft ? "right-start" : "bottom-start";
	let strategy: Strategy = "absolute";

	let reference: HTMLElement | undefined = undefined;
	let floating: HTMLElement;
	let animationClass: string = '';

	// settings
	const spacing = 8;
	const minWidth = 256;
	const maxWidth = 360;
	const minHeight = 48;
	const maxHeight = 640;

	const transformOriginMap = [
		['top-start'   ,'bottom left'],
		['top-end'     ,'bottom right'],
		['bottom-start','top left'],
		['bottom-end'  ,'top right'],
		['left-start'  ,'right top'],
		['left-end'    ,'right bottom'],
		['right-start' ,'left top'],
		['right-end'   ,'left bottom '],
	];

	const dispatch = createEventDispatcher<$$Events>();
	const debouncedUpdate = debounce(() => update(), 100);

	const context = getContext<FloatingContex | undefined>('floating');
	if (context?.nested) {
		strategy = "fixed";
	}
	setContext<FloatingContex>('floating', {
		nested: true,
	});

	//onMount(debouncedUpdate);

	export function toggle(options: FloatingOpeningOptions = { reference }) {
		currentContext?.id !== options.context?.id || !opened
			? open(options)
			: close();
	}

	function requestClose(event: MouseEvent & { target: HTMLElement }) {
		if (openedContainer === event.target.closest("button")) return;
		close();
	}

	export function close() {
		opened = false;
		animationClass = 'animate-out';
		dispatch('close');
	}

	export function open(options: FloatingOpeningOptions = { reference }) {
		if (!render) {
			render = true;
			setTimeout(() => open(options), 0);
			return;
		}
		opened = true;
		animationClass = 'animate-in';
		// update on init or context change
		const requiresUpdate = !initialized
			|| currentContext?.id !== options.context?.id;
		currentContext = options.context;
		openedContainer = options.reference;
		// update position
		if (requiresUpdate) update(options.reference);
		// find and focus first input
		const firstInput = floating.querySelector<HTMLInputElement | HTMLTextAreaElement>("[autofocus]");
		if (firstInput) firstInput.focus?.();
		// communicate opened
		dispatch('open');
	}

	function update(_reference: HTMLElement | undefined = reference) {
		if (!_reference) return;
		initialized = true;
		computePosition(_reference, floating, {
			placement,
			strategy,
			middleware: [
				offset(spacing),
				size({
					apply({availableHeight, availableWidth, elements}) {
						const height = elements.floating.children[0].clientHeight + 2;
						const {width} = elements.reference.getBoundingClientRect();
						Object.assign(elements.floating.style, {
							width: `${Math.min(maxWidth, Math.max(minWidth, Math.min(width, availableWidth)))}px`,
							height: `${Math.min(maxHeight, Math.max(minHeight, Math.min(height, availableHeight)))}px`,
						});
					},
				}),
				flip({
					padding: spacing,
					mainAxis: true,
					crossAxis: true,
					fallbackAxisSideDirection: 'end',
					flipAlignment: true,
					fallbackStrategy: 'bestFit',
				}),
			]
		}).then(({x, y, placement}) => {
			Object.assign(floating.style, {
				left: `${x}px`,
				top: `${y}px`,
				transformOrigin: transformOriginMap.find(([p]) => p === placement)?.[1] ?? "",
			});
		});
	}
</script>

<svelte:window on:resize={debouncedUpdate} />

<template>
	<div bind:this={reference}
		class="floating {alignmentClasses[alignment]}"
		use:clickOutside={requestClose}>
		<slot name="item" {open} {close} {toggle} {opened}/>
		<menu bind:this={floating}
			  class="{strategy} {animationClass}"
			  class:opened>
			{#if render}
				<div class="{classes}">
					<slot name="menu" {close} {opened} />
				</div>
			{/if}
		</menu>
	</div>
</template>


<style global lang="postcss">
	.floating {
		& > menu {
			@apply overflow-hidden pointer-events-none
			w-0 h-0;
			will-change: transform, opacity;
			&.opened {
				@apply overflow-visible pointer-events-auto;
			}
			&.animate-in {
				animation: floatingIn 200ms forwards ease-in-out;
			}
			&.animate-out {
				animation: floatingOut 200ms forwards ease-in-out;
			}
			& > div {
				@apply flex flex-col
				overflow-auto
				border shadow-md rounded
				border-gray-300 dark:border-gray-700
				bg-gray-50 dark:bg-gray-800;
			}
		}
	}

	@keyframes floatingIn {
		0% {
			@apply scale-0 opacity-0;
		}
		75% {
			@apply scale-105 opacity-50;
		}
		100% {
			@apply scale-100 opacity-100;
		}
	}
	@keyframes floatingOut {
		0% {
			@apply scale-100 opacity-100;
		}
		25% {
			@apply scale-105 opacity-50;
		}
		100% {
			@apply scale-50 opacity-0;
		}
	}
</style>
