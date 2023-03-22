<script lang="typescript">
	import Select from '$src/components/controls/selects/Select.svelte';
	import { _ } from 'svelte-i18n';
	import { theme, themes } from '$src/lib/theme';
</script>


	<Select name="theme" value={$theme} items={themes} on:change={(e) => theme.set(e.detail.item)}>
		<p slot="value" let:item class="text">{$_(item.text)}</p>
		<p slot="item" let:item class="text">{$_(item.text)}</p>
	</Select>


<style lang="postcss">
</style>
