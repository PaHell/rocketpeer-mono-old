<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
    import { match as _match } from '$src/lib/navigation';
</script>

<script lang="typescript">
    interface $$Slots {
        default: {
            active: boolean,
            redirect: () => void,
        };
    }
	export let path: string = "";
    export let match: number = 0; // 0 = exact, >0 = from start

    let active: boolean = false;
    let currentPath: string = "";

    onMount(() => {
        onNavigate();
	});
    
	afterNavigate(() => {
        onNavigate();
	});

	function onNavigate() {
        currentPath = window.location.pathname;
        active = _match(path, currentPath, match);
	}

</script>

<slot {active} redirect={() => goto(path)}/>

<style global lang="postcss">
</style>
