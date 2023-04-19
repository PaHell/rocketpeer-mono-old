<script lang="typescript">
	import Select from '$src/components/controls/selects/Select.svelte';
	import { createEventDispatcher, type ComponentEvents } from 'svelte';
	import { _ } from 'svelte-i18n';

    const NO_VALUE: [string, number] = ["select.none", -1];
    
    type EnumEntry = [string, string | number];

    interface $$Events {
        change: EnumEntry[1];
    }

    export let entries: EnumEntry[] = [];
    export let value: EnumEntry[1] = -1;
    let internalValue: EnumEntry = NO_VALUE;

    $: internalValue = entries.find(e => e[1] === value) ?? NO_VALUE;

    const dispatch = createEventDispatcher<$$Events>();

    const half = Math.ceil(entries.length / 2);    
    const items: EnumEntry[] = entries.slice(half);

    function onChange(event: CustomEvent<ComponentEvents<Select<EnumEntry>>>) {
        value = event.detail.item[1];
        dispatch('change', value);
    }
</script>

<template>
    <Select name="enum" bind:value={internalValue} {items} on:change={onChange}>
		<p slot="value" let:item class="text">{$_(item[0])}</p>
		<p slot="item" let:item class="text">{$_(item[0])}</p>
	</Select>
</template>
    

<style lang="postcss">
</style>
