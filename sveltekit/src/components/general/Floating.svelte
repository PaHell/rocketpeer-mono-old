<script lang="typescript" context="module">
	import { arrow, autoUpdate, computePosition, flip, inline, offset, shift, type Placement, type Platform, type Strategy, autoPlacement, size} from '@floating-ui/dom';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { debounce } from '$src/lib/helpers';
	import { clickOutside } from '$src/lib/use';

	export enum FloatingAlignment {
        RightLeft,
		BottomTop,
    }
	const alignmentClasses = [
		"align-rl",
		"align-bt",
	];

	export enum FloatingWidth {
		Normal,
		Wide,
	}
	const widthClasses = [
		"width-normal",
		"width-wide",
	];

	interface FloatingContex {
		nested: boolean;
	}
	
</script>

<script lang="typescript">
	interface $$Slots {
		item: {
			open: () => void;
			close: () => void;
			toggle: () => void;
			opened: boolean;
		};
		menu: {
			close: () => void;
			opened: boolean;
		};
	}
	interface $$Events {
		open: void;
		close: void;
	}

	export let alignment: FloatingAlignment = FloatingAlignment.BottomTop;
	let classes = '';
	export { classes as class };
	export let lazy = false;
	
	let opened = false;
	let render = !lazy;
	let placement: Placement = "right";
	$: placement = alignment === FloatingAlignment.RightLeft ? "right-start" : "bottom-start";
	let strategy: Strategy = "absolute";

	let refContainer: HTMLElement | null = null;
	let refMenu: HTMLElement;
	let styleMenu: {[key: string]: string} = {};

	// settings
	const spacing = 8;
	const minWidth = 256;
	const maxWidth = 360;
	const minHeight = 320;
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
	const debouncedUpdate = debounce(update, 100);

	const context = getContext<FloatingContex | undefined>('floating');
	if (context?.nested) {
		strategy = "fixed";
	}
	setContext<FloatingContex>('floating', {
		nested: true,
	});

	onMount(debouncedUpdate);

	export function toggle(cont: HTMLElement | Event | null = refContainer, ctx: T | null = null) {
		if (cont?.hasOwnProperty('isTrusted')) {
			cont = refContainer;
		}
		if (!cont) return;
		console.log("normal:", {opened, cont, ctx});
		opened ? close() : open(cont);
	}

	export function close() {
		opened = false;
		dispatch('close');
	}

	function requestClose() {
		if (!$$slots.item) return;
		console.log(">>> closing");
		close();
	}

	export function open(cont: HTMLElement | null = refContainer) {
		if (!render) {
			render = true;
			setTimeout(open, 0);
			return;
		}
		opened = true;
		update(cont);
		dispatch('open');
	}

	function update(container: HTMLElement | null = refContainer) {
		if (!container) return;
		computePosition(container, refMenu, {
			placement,
			strategy,
			middleware: [
				offset(spacing),
				size({
					apply({availableHeight, availableWidth, elements}) {
						const {width, height} = container.getBoundingClientRect();
						if (!opened) {
							styleMenu["width"] = '0';
							styleMenu["height"] = '0';
						}
						else {
							styleMenu["width"] = `${Math.min(maxWidth, Math.max(minWidth, Math.min(width, availableWidth)))}px`;
							styleMenu["height"] = `${Math.min(maxHeight, Math.max(minHeight, Math.min(height, availableHeight)))}px`;
							console.log(styleMenu["width"], styleMenu["height"]);
						}
						styleMenu = {...styleMenu};
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
			styleMenu["left"] = `${x}px`;
			styleMenu["top"] = `${y}px`;
			styleMenu["transform-origin"] = transformOriginMap.find(([p]) => p === placement)?.[1] ?? "";
			styleMenu = {...styleMenu};
		});
	}
</script>

<svelte:window on:resize={debouncedUpdate} />

<template>
	<div bind:this={refContainer}
		class="floating {alignmentClasses[alignment]}"
		use:clickOutside={requestClose}>
		<slot name="item" {open} {close} {toggle} {opened}/>
		<menu bind:this={refMenu}
				style={Object.entries(styleMenu).map(([key, value]) => `${key}: ${value};`).join(" ")}
				class={strategy}
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
			@apply overflow-hidden scale-90;
			&.opened {
				@apply overflow-visible;
				animation: floatingIn 200ms forwards ease-in-out;
				& > div {
					@apply opacity-100;
				}
			}
			&:not(.opened) {
				@apply w-0 h-0 !important;
			}
			& > div {
				@apply flex flex-col h-full
				overflow-auto opacity-0
				border shadow-md rounded
				transition-opacity duration-200 ease-in-out
				border-gray-300 dark:border-gray-700
				bg-gray-50 dark:bg-gray-800;
			}
		}
		&.width-normal {
			& > menu {
				@apply w-56;
			}
		}
		&.width-wide {
			& > menu {
				@apply w-96;
			}
		}
	}

	@keyframes floatingIn {
		50% {
			@apply scale-105;
		}
		100% {
			@apply scale-100;
		}
	}
</style>
