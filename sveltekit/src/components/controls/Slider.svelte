<script lang="typescript" context="module">
	import { _ } from 'svelte-i18n';
</script>

<script lang="typescript">
	export let value: number = 0;
    export let from: number = 0;
    export let to: number = 100;
    export let step: number = 1;
    export let disabled: boolean = false;
</script>

<template>
    <input
        type="range"
        bind:value
        min={from}
        max={to}
        step={step}
        {disabled}/>
</template>


<style global lang="postcss">
	.button {
	}
</style>
