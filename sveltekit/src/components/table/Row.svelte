<script lang="typescript" context="module">
	import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
	import Column from '$src/components/table/Column.svelte';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import type { TableContext } from '$src/components/table/Table.svelte';
	import { get, type Writable } from 'svelte/store';
	import type { RowContextStore } from './store';

	export interface RowContext<T> {
		item: T;
		index: number;
		state: RowState;
		initialState: RowState;
	}

	export enum RowState {
		Unmodified,
		Added,
		Modified,
		Deleted
	}

	export const classes = [
		'unmodified',
		'added',
		'modified',
		'deleted'
	];

	export const translations = [
		'unmodified',
		'added',
		'modified',
		'deleted'
	];
</script>

<script lang="typescript">
	type T = $$Generic<App.DB.PrimaryKey>;

	export let item: T;
	export let hideState: boolean;
	export let disableRemove: boolean;

	const table = getContext<TableContext<T>>('table');
	const store = table.getRowContextStore(item);
	setContext<RowContextStore<T>>('store', store);
	let state: RowState = RowState.Unmodified;
	state = get(store).state;
	store.subscribe((ctx) => {
		state = ctx.state;
	});

	function toggleRemove() {
		store.setState(state === RowState.Deleted
			? RowState.Unmodified
			: RowState.Deleted);
	}

</script>

<template>
	<tr class={classes[state]}>
		{#if !hideState}
			<td class="state">
				<div></div>
			</td>
		{/if}
		<slot />
		{#if !disableRemove}
			<td>
				<Button
					icon={state === RowState.Deleted
						? Icons.UndoDelete
						: Icons.Delete}
					variant={ButtonVariant.Secondary}
					on:click={toggleRemove}/>
			</td>
		{/if}
	</tr>
</template>


<style global lang="postcss">
</style>
