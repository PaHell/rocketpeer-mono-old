<script lang="typescript" context="module">
	import { arrow, autoUpdate, computePosition, flip, inline, offset, shift, type Placement, type Platform, type Strategy} from '@floating-ui/dom';
	import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
	import { debounce } from '$src/lib/helpers';
	import { clickOutside } from '$src/lib/use';

	// fixed
	// absolute
	export enum Position {
		Vertical,
		Horizontal,
	}

	interface OverlayContex {
		nested: boolean;
	}
	
</script>

<script lang="typescript">
	interface $$Slots {
		item: {
			open: () => void;
			close: () => void;
			toggle: () => void;
		};
		menu: {
			close: () => void;
		};
	}
	interface $$Events {
		open: void;
		close: void;
	}

	export let position: Placement = "bottom";
	let classes = '';
	export { classes as class };
	export let opened = false;
	
	let render = false;
	let strategy: Strategy = "absolute";

	let refContainer: HTMLElement | undefined;
	let refMenu: HTMLElement | undefined;

	const dispatch = createEventDispatcher<$$Events>();
	const debouncedUpdate = debounce(update, 100);

	const context = getContext<OverlayContex | undefined>('overlay');
	if (context?.nested) {
		strategy = "fixed";
	}
	setContext<OverlayContex>('overlay', {
		nested: true,
	});

	onMount(() => {
		debouncedUpdate();
	});

	function toggle() {
		opened ? close() : open();
	}

	function close() {
		if (!refMenu || !opened) return;
		opened = false;
		dispatch('close');
	}

	function open() {
		if (!refMenu || opened) return;
		// first view is lazy, items stay rendered afterwards
		if (!render) {
			render = true;
			setTimeout(open, 0);
			return;
		}
		opened = true;
		update();
		dispatch('open');
	}

	function update() {
		if (!refContainer || !refMenu) return;
		computePosition(refContainer, refMenu, {
			placement: position,
			strategy,
			middleware: [
				flip(),
				offset({
					mainAxis: 8,
					crossAxis: 0,
				}),
			]
		}).then(({x, y}) => {
			Object.assign(refMenu.style, {
				left: `${x}px`,
				top: `${y}px`,
			});
		});
	}
</script>

<svelte:window on:resize={debouncedUpdate} />



	<div bind:this={refContainer} class="overlay {position} {classes}" class:opened use:clickOutside={close}>
		<slot name="item" {open} {close} {toggle} />
		<menu bind:this={refMenu} class={strategy}>
			<main>
				{#if render}
					<slot name="menu" {close} />
				{/if}
			</main>
		</menu>
	</div>


<style global lang="postcss">
	.overlay {
		& > .active {
			@apply relative z-50 !important;
		}
		& > menu {
			@apply z-40 overflow-hidden
			w-56 max-h-0 transition-[max-height] duration-200 ease-linear;
			will-change: max-height;
			& > main {
				@apply flex flex-col border shadow-md rounded
				border-gray-300 dark:border-gray-700
				bg-gray-50 dark:bg-gray-800;
			}
		}

		&.opened > menu {
			@apply max-h-96 overflow-visible;
		}
	}
</style>
