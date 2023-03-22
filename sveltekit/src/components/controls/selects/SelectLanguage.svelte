<script lang="typescript">
	import Select from '$src/components/controls/selects/Select.svelte';
	import { locale, locales } from '$src/lib/i18n';
</script>


	<Select
		name="language"
		value={$locale}
		items={locales}
		on:change={(e) => locale.set(e.detail.item)}
	>
		<p slot="value" let:item class="text">
			{item.name}
			<span class="secondary">({item.iso2})</span>
		</p>
		<p slot="item" let:item class="text">
			{item.name}
			<span class="secondary">({item.iso2})</span>
		</p>
	</Select>


<style lang="postcss">
</style>
