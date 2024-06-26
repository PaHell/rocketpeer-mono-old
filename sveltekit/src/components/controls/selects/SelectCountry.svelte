<script lang="typescript">
	import Select from '$src/components/controls/selects/Select.svelte';
	import type { Country } from '$src/lib/countries';
	import { countries } from '$src/lib/countries';
	import { createEventDispatcher, type ComponentEvents } from 'svelte';

	interface $$Events {
		change: {
			item: Country;
			index: number;
		};
	}

	export let value: Country | undefined = undefined;
	export let iso3: string | undefined = undefined;
	export let required = false;

	const dispatch = createEventDispatcher<$$Events>();

	$: {
		if (iso3 != value?.iso3) {
			console.warn('$$$ SelectCountry, updating value');
			value = $countries.find((c) => c.iso3 === iso3);
		}
	}

	function onChange(event: CustomEvent<ComponentEvents<Select<Country>>['change']>) {
		value = event.detail.item;
		iso3 = event.detail.item.iso3;
		dispatch('change', event.detail);
	}

</script>


	<Select
		bind:value
		name="country"
		items={$countries}
		searchKeysOrdered={['iso3', 'name']}
		enableSearch={true}
		searchName="search_country"
		on:change={onChange}
		{required}
	>
		<svelte:fragment slot="value" let:item>
			<div class="flag">
				<img src={item.flag} alt="Flag of {item.name} ({item.iso3})" />
			</div>
			<p class="text flex-1">
				{item.name}
				<span class="secondary">({item.iso3})</span>
			</p>
		</svelte:fragment>
		<svelte:fragment slot="item" let:item>
			<div class="flag">
				<img src={item.flag} alt="Flag of {item.name} ({item.iso3})" />
			</div>
			<p class="text">
				{item.name}
				<span class="secondary">({item.iso3})</span>
			</p>
		</svelte:fragment>
	</Select>


<style global lang="postcss">
	.flag {
		@apply overflow-hidden
    w-6 h-6 rounded;
		&:before {
			content: '';
			@apply block w-6 h-6 -mb-6 relative rounded;
		}
		& > img {
			@apply h-6 object-cover;
		}
	}

	.flag:before {
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	.dark .flag:before {
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}
</style>
