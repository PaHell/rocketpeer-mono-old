<script lang="ts" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
</script>

<script lang="ts">
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

    function isActive(path: string) : boolean {
        if (match == 0) return path === currentPath;
        const currSplit = currentPath.split('/');
        const pathSplit = path.split('/');
        for (let i = 0; i <= match; i++) {
            if (currSplit[i] !== pathSplit[i]) return false;
        }
        return true;
    }

	function onNavigate() {
        currentPath = window.location.pathname;
        active = isActive(path);
	}

</script>

<slot {active} redirect={() => goto(path)}/>

<style global lang="postcss">
</style>
