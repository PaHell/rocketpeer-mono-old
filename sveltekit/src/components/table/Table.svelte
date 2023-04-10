<script lang="typescript" context="module">
	import { createEventDispatcher, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
	import Row, { classes, RowState, translations, type RowContext } from '$src/components/table/Row.svelte';
	import { derived, get } from 'svelte/store';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import type { IColumn } from '$src/components/table/Column.svelte';
	import { createRowContextStore, type RowContextStore } from '$src/components/table/store';
	export interface TableContext<T> {
		registerColumn: (col: IColumn<T>) => void;
		getRowContextStore: (item: T) => RowContextStore<T>;
	}
</script>
<script lang="typescript">
	type T = $$Generic<App.DB.PrimaryKey>;

	// events
	interface $$Events {
		change: RowContext<T>;
	}
	// props
	export let items: T[] = [];
	export let css: string = '';
	// hooks
	export let onAdd: () => T = () => ({ id: items.length + 1 } as T);
	// toggles
	export let disableAdd: boolean = false;
	export let disableExport: boolean = false;
	export let disableRemove: boolean = false;
	export let disableSave: boolean = false;
	export let hideState: boolean = false;

	const dispatch = createEventDispatcher<$$Events>();

	let columns: IColumn<T>[] = [];
	let activeColumn: IColumn<T> | null = null;
	let columnSortedAsc: boolean = false;
	let contextStores: RowContextStore<T>[] = [];
	let counters: [RowState, number][] = [];
	let noItems: string = 'No items';
	let filename: string = 'items';	

	setContext<TableContext<T>>('table', {
		registerColumn,
		getRowContextStore,
	});

	onMount(() => {
		// sort by first column
		if (columns.length > 0) {
			const col = columns.find(c => c.key);
			if (!col) return;
			console.warn("Sort by first column", col.key);
			sortByColumn(col);
		}
	});

	function log(text: string, ctx: RowContext<T>) {
		console.log(text + ":", {
			id: ctx.item.id,
			state: ctx.state,
		});
	}

	function addItem() {
		const item = onAdd();
		const length = items.push(item);
		console.log('addItem', item.id);
		const store = createRowContextStore(item, length, RowState.Added);
		contextStores.push(store);
		items = items;
		store.subscribe(onRowChanged);
	}
	
	function getRowContextStore(item: T): RowContextStore<T> {
		const index = items.findIndex((i) => i.id === item.id);
		let store = contextStores.find(c => get(c).item.id === item.id);
		if (store) return store;
		store = createRowContextStore(item, index, RowState.Unmodified);
		console.log('getRowContextStore > created', store);
		store.subscribe(onRowChanged);
		contextStores.push(store);
		//contexts = [...contexts];
		return store;
	}

	function onRowChanged(context: RowContext<T>) {
		console.warn('onRowChanged', context.item);
		dispatch('change', context);
		const contexts = contextStores.map(c => get(c));
		counters = Object.values(RowState)
			.filter((state) => !isNaN(state)
				&& state !== RowState.Unmodified)
			.map((state) => {
				const count = contexts.filter((c) => c.state === state).length;
				return [state, count] as [RowState, number];
			});
		items = items.map((item) => {
			const context = contexts.find((c) => c.item.id === item.id);
			return context?.item ?? item;
		});
	}

	function sortByColumn(column: IColumn<T>) {
		console.log("Sort by: ", column.key);
		// toggle order or set column
		if (!column.key) return;
		columnSortedAsc = activeColumn === column;
		activeColumn = column;
		const key = column.key;
		// sort items
		items = items.sort((a, b) => {
			let score = 0;
			const _a = String(a[key]);
			const _b = String(b[key]);
			if (_a < _b) score = -1;
			else if (_a > _b) score = 1;
			return score * (columnSortedAsc ? 1 : -1);
		});
		// update row indexes
		for (const store of contextStores) {
			const context = get(store);
			const index = items.findIndex((item) => item.id === context.item.id);
			store.update(ctx => {
				ctx.index = 10 + index;
				return ctx;
			});
		}
	}

	function saveChanges() {
		console.warn('Save Changes', JSON.stringify(items));
	}

	function exportAll() {
		const jsonString = JSON.stringify(items, null, 4);
		const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		// the filename you want
		a.download = `${$_(filename)}.json`;
		document.body.appendChild(a);
		a.click();
	}

	function registerColumn(col: IColumn<T>) {
		console.log('Register col:', col.title);
		columns.push(col);
	}

	function toggleDelete(store: RowContextStore<T>) {
		const curr = get(store);
		store.setState(curr.state == RowState.Deleted
			? curr.initialState
			: RowState.Deleted);
	}
</script>

<template>
	<div class="table-container {css}">
		<slot/>
		<table class="table">
			<thead>
				<tr>
					{#if !hideState}
						<th class="w-6"></th>
					{/if}
					{#each columns as col}
						<th style="width: {col.width};">
							{#if col.key && items?.length}
								<Button
									variant={ButtonVariant.Secondary}
									active={activeColumn === col}
									on:click={() => sortByColumn(col)}>
									<p class="text flex-1">{$_(col.title)}</p>
									<Icon
										name={activeColumn === col && columnSortedAsc
											? Icons.OrderByAsc
											: Icons.OrderByDesc}/>
								</Button>
							{:else}
								<p class="text">{$_(col.title)}</p>
							{/if}
						</th>
					{/each}
					{#if !disableRemove}
						<th class="w-10"></th>
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if !items?.length}
					<tr>
						<td colspan={columns.length}>
							<p class="text sec">{$_('lib.table.noItems')}</p>
						</td>
					</tr>
				{/if}
				{#each items as item (item.id)}
					<Row {item} {hideState} {disableRemove}>
						<slot />
					</Row>
				{/each}
			</tbody>
		</table>
		<footer>
			{#if !disableAdd}
				<Button
					icon={Icons.Add}
					text="components.table.add"
					variant={ButtonVariant.Secondary}
					on:click={addItem}/>
			{/if}
			{#if !disableRemove}
				<Button
					icon={Icons.FileDownload}
					text="components.table.export_json"
					variant={ButtonVariant.Secondary}
					on:click={exportAll}/>
			{/if}
			<div class="flex-1" />
			{#if !hideState}
				{#each counters as [state, count]}
					{#if count > 0}
						<p class="text badge {classes[state]}">
							{count}
							{$_('lib.table.row_state.' + translations[state])}
						</p>
					{/if}
				{/each}
			{/if}
			{#if !disableSave}
				<Button
					icon={Icons.SaveChanges}
					text="lib.table.save"
					variant={ButtonVariant.Primary}
					on:click={saveChanges}/>
			{/if}
		</footer>
	</div>
</template>

<style global lang="postcss">
	.table-container > footer {
		@apply flex space-x-2 items-center mt-2;
		& > .badge {
			@apply flex items-center text-sm font-semibold;
			&:not(:last-of-type):after {
				content: '';
				@apply block w-1 h-1 ml-2 rounded-full bg-gray-400 dark:bg-gray-600;
			}
			&.added {
				@apply text-success-500 dark:text-success-400;
			}
			&.modified {
				@apply text-warning-500 dark:text-warning-400;
			}
			&.deleted {
				@apply text-danger-500 dark:text-danger-400;
			}
		}
		& > .button {
			&:last-child {
				@apply ml-4;
			}
		}
	}
	.table {
		@apply border border-separate border-spacing-0
        w-full table-fixed rounded
        bg-gray-100 dark:bg-gray-900
        border-gray-300 dark:border-gray-700;

		& th {
			&:first-child {
				@apply rounded-tl overflow-hidden;
			}
			&:last-child {
				@apply rounded-tr overflow-hidden;
			}
			& > .text {
				@apply font-semibold;
			}
		}
		& th,
		& td {
			@apply p-0 m-0
            border-b box-content
            font-normal text-left text-base
            border-gray-300 dark:border-gray-700;
			height: calc(2.5rem - 2px);
			&:not(:last-child) {
				@apply border-r;
			}
			&.state {
				@apply w-6;
				& > div {
					@apply w-2 h-2 mx-auto rounded-full;
				}
			}
			& > * {
				@apply m-[-1px];
			}
			& > .input-container {
				& > .label {
					@apply hidden;
				}
				& > .input {
					& > input {
						@apply rounded-none;
					}
				}
			}
			& > .text {
				@apply px-3 whitespace-nowrap overflow-hidden text-ellipsis;
			}
			& > .button {
				@apply rounded-none;
				&:first-child:last-child {
					width: calc(100% + 2px);
				}
			}

			& > .select {
				& > .label {
					@apply hidden;
				}
				& > .button {
					@apply rounded-none;
				}
			}
		}

		& > thead {
			& > tr {
			}
		}
		& > tbody {
			& > tr {
				@apply transition-colors;
				&:last-child > td {
					@apply border-b-0;
				}
				&.unmodified > td.state > div {
					@apply bg-gray-300 dark:bg-gray-700;
				}
				&.modified > td.state > div {
					@apply bg-warning-500 dark:bg-warning-400;
				}
				&.added > td.state > div {
					@apply bg-success-500 dark:bg-success-400;
				}
				&.deleted > td.state > div {
					@apply bg-danger-500 dark:bg-danger-400;
				}
			}
		}
	}
</style>
