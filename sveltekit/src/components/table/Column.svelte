<svelte:options accessors />

<script lang="typescript">
	import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
	import { type TableContext } from '$src/components/table/Table.svelte';

	type T = $$Generic;
	interface $$Slots {
		default: {};
	}

	export let title: string = '';
	export let width: string = 'auto';
	let classes: string = '';
	export { classes as class };
	export let sortByKey: keyof T | null = null;

	const index = getContext<number>('index');
	if (index === 0) {
		const table = getContext<TableContext<T>>('table');
		table.registerColumn(title, width, classes, sortByKey);
	}
</script>


	<td class={classes}>
		<slot />
	</td>


<style global lang="postcss">
</style>
