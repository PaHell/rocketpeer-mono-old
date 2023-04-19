<!--
	<svelte:options accessors />
-->
<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import type { TableContext } from '$src/components/table/Table.svelte';
	import type { RowContextStore } from './store';
	export interface IColumn<T> {
		key: keyof T | null;
		title: string;
		width: string;
		class: string;
	}
</script>

<script lang="typescript">

	type T = $$Generic;
	interface $$Slots {
		default: {
			store: RowContextStore<T>
		};
	}

	export let key: keyof T | undefined = undefined;
	export let title = '';
	export let width = 'auto';
	let classes = '';
	export { classes as class };

	const store = getContext<RowContextStore<T>>('store');
	if (!store) {
		const table = getContext<TableContext<T>>('table');
		table.registerColumn({key, title, width, class: classes} as IColumn<T>);
	}

</script>

<template>
	{#if store}
		<td class={classes}>
			{#if $$slots.default}
				<slot store={store} />
			{:else if key}
				<p class="text">{$store.item[key] ?? ""}</p>
			{/if}
		</td>
	{/if}
</template>

<style global lang="postcss">
</style>
