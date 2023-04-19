<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { match as _match } from '$src/lib/navigation';
</script>

<script lang="typescript">
    interface $$Slots {
        default: {
            active: boolean,
            redirect: () => void,
        };
    }
	export let path = "";
    export let match = 0; // 0 = exact, >0 = from start

    let active = false;
    let currentPath = "";

    onMount(onNavigate);
	afterNavigate(onNavigate);

	function onNavigate() {
        currentPath = window.location.pathname;
        active = _match(path, currentPath, match);
	}

</script>

<slot {active} redirect={() => goto(path)}/>

<style global lang="postcss">
</style>
