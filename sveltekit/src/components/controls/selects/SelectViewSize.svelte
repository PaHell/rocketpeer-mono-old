<script lang="typescript">
	import Select from '$comps/controls/selects/Select.svelte';
	import { _ } from 'svelte-i18n';
	import { viewSize, sizes } from '$lib/viewSize';
</script>


	<Select
		name="view_size"
		value={$viewSize}
		items={sizes}
		on:change={(e) => viewSize.set(e.detail.item)}
	>
		<p slot="value" let:item class="text">{$_(item.text)}</p>
		<p slot="item" let:item class="text">{$_(item.text)}</p>
	</Select>


<style lang="postcss">
</style>
