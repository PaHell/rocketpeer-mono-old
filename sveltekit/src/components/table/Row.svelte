<svelte:options accessors />

<script lang="ts" context="module">
	import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
	import Column from '$comps/table/Column.svelte';
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import { Icons } from '$comps/general/Icon.svelte';

	export enum RowState {
		Unmodified,
		Added,
		Modified,
		Deleted
	}

	export const classes = {
		[RowState.Unmodified]: 'unmodified',
		[RowState.Modified]: 'modified',
		[RowState.Added]: 'added',
		[RowState.Deleted]: 'deleted'
	};

	export const translations = {
		[RowState.Unmodified]: 'unmodified',
		[RowState.Modified]: 'modified',
		[RowState.Added]: 'added',
		[RowState.Deleted]: 'deleted'
	};
</script>

<script lang="ts">
	type T = $$Generic;
	interface $$Slots {
		default: {
			context: App.General.RowContext<T>;
		};
	}
	export let item: T;

	const table = getContext<App.General.TableContext<T>>('table');
	let context = table.getRowContext(item, changed);
	setContext<number>('index', context.index);

	function changed() {
		refreshContext();
	}

	function refreshContext() {
		context = table.getRowContext(item, changed);
		//setContext<App.General.RowContext<T>>("row", context);
	}

	function toggleDelete() {
		context.changed(context.state == RowState.Deleted ? context.initialState : RowState.Deleted);
	}
</script>


	<tr class={classes[context.state]}>
		<Column title="" class="state" width="1.5rem">
			<div />
		</Column>
		<slot {context} />
		<Column title="" width="2.25rem">
			<Button
				icon={context.state == RowState.Deleted ? Icons.UndoDelete : Icons.Delete}
				variant={ButtonVariant.Secondary}
				on:click={toggleDelete}
			/>
		</Column>
	</tr>


<style global lang="postcss">
</style>
