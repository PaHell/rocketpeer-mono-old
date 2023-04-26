<svelte:options accessors={true} immutable={true} />

<script lang="typescript" context="module">
	// IMPORT
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import {
		createEventDispatcher,
		getContext,
		onMount,
		SvelteComponent,
		type ComponentEvents
	} from 'svelte';
	import { _ } from 'svelte-i18n';
	import { debounce, searchByKeys } from '$src/lib/helpers';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import type { FormContext } from '$src/components/general/Form.svelte';
	import Floating, { FloatingAlignment } from "$src/components/general/Floating.svelte";
</script>

<script lang="typescript" strictEvents>

	// TYPE
	type T = $$Generic;
	interface $$Slots {
		values: {
			items: T[];
			index: number;
		};
		value: {
			item: T;
			index: number;
		};
		item: {
			item: T;
			index: number;
		};
		none: {};
	}
	interface $$Events {
		change: {
			item: T;
			index: number;
		};
	}
	// PROPS
	export let items: T[] = [];
	export let value: T | undefined = undefined;
	export let values: T[] = [];
	export let none: string | undefined = undefined;
	export let index = -1;
	export let name: string;
	export let searchName: string = 'search';
	export let hideLabel = false;
	export let allowMultiple = false;
	export let enableSearch = false;
	export let searchKeysOrdered: (keyof T)[] = [];
	export let searchDebounce = 75;
	export let disabled = false;
	export let required = false;
	// REFS
	let refSearch: SvelteComponent | undefined;
	// DATA
	const debouncedSearch = debounce((evt: CustomEvent<ComponentEvents<TextInput<string>>['change']>) => {
		searchItems = searchByKeys(evt.detail, items, searchKeysOrdered);
	}, searchDebounce);
	let searchItems: T[] = [];
	let searchValue = '';
	// EVENTS
	const dispatch = createEventDispatcher<$$Events>();
	// LIFECYCLE
	const form = getContext<FormContext | undefined>('form');
	onMount(() => {
		validate();
	});
	// FUNCTIONS
	function validate() {
		if (form) form(name, !required || !!value || !!values.length);
	}
	function select(item: T, _index: number, close: () => void) {
		if (allowMultiple) {
			if (values.includes(item)) {
				values = values.filter((v) => v != item);
			} else {
				values = [...values, item];
			}
		} else {
			value = item;
			index = _index;
		}
		validate();
		dispatch('change', { item, index });
		if (!allowMultiple) close();
	}

	function selectFirst(close: () => void) {
		if (searchItems.length == 0) return;
		select(searchItems[0], 0, close);
	}
</script>

<template>
	<Floating
		alignment={FloatingAlignment.BottomTop}
		class="select"
		on:open={refSearch?.focus}>
		<svelte:fragment slot="item" let:toggle let:opened>
			{#if !hideLabel}
				<p class="text label">{$_(`lib.controls.select.${name}`)}</p>
			{/if}
			<Button
				active={opened}
				{disabled}
				variant={ButtonVariant.Secondary}
				class="button-select"
				on:click={toggle}>
				{#if allowMultiple && values.length}
					<slot name="values" items={values} {index} />
				{:else if value}
					<slot name="value" item={value} {index} />
				{:else if $$slots.none}
					<slot name="none" />
				{:else}
					<p class="text secondary">{$_(none ?? 'lib.controls.select.none')}</p>
				{/if}
				<Icon name={Icons.SelectDown} />
			</Button>
		</svelte:fragment>
		<svelte:fragment slot="menu" let:close let:opened>
			{#if enableSearch}
				<header>
					<TextInput
						bind:this={refSearch}
						bind:value={searchValue}
						name={searchName}
						disableTabIndex={!opened}
						on:change={debouncedSearch}
						on:enter={() => selectFirst(close)}
						hideLabel
					/>
				</header>
			{/if}
			<div>
				{#each searchValue ? searchItems : items as item, index}
					<Button
						variant={ButtonVariant.Transparent}
						active={item == value || values.includes(item)}
						on:click={() => select(item, index, close)}>
						<slot name="item" {item} {index} />
						<Icon name={Icons.SelectSelected} />
					</Button>
				{/each}
			</div></svelte:fragment
		>
		</Floating>
</template>

<style global lang="postcss">
	.button-select {
		@apply w-full;
		&.active {
			@apply z-50;
		}

		& > .text {
			&:not(.secondary) {
				@apply text-pri dark:text-dark-pri;
			}
			&:first-child {
				@apply flex-1;
			}
		}

		& > .icon {
			&:last-child {
				@apply pl-1 -mr-2 box-content border-l
				border-gray-300 dark:border-gray-600;
			}
		}

		&:hover {
			& > .icon {
				&:last-child {
					@apply border-gray-300 dark:border-gray-500;
				}
			}
		}
	}

	.select {
		& > * {
			@apply border-inherit;
			&:not(:first-child) {
				@apply border-t;
			}
		}

		& > header {
			@apply flex-shrink-0 p-2;
		}

		& > div {
			@apply flex-1 py-2 overflow-y-auto overflow-x-hidden;
			& .button {
				@apply justify-start w-full
			rounded-none border-none;
				@apply shadow-none ring-0 ring-offset-0 !important;

				& > .text:not(.secondary) {
					@apply text-pri dark:text-dark-pri;
				}

				& > .icon:last-child {
					@apply hidden;
				}

				&.active {
					& > .icon:last-child {
						@apply block;
					}
				}
			}
		}
	}
</style>
