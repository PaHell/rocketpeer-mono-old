<script lang="typescript">
	export let value = 0;
    export let from = 0;
    export let to = 100;
    export let step = 1;
    export let disabled = false;
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
