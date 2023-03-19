<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Icons } from '$src/components/general/Icon.svelte';
    export interface NavItem {
        title: string;
        icon: Icons;
        path: string;
    }
</script>

<script lang="typescript">
    type T = $$Generic<object>;
    interface $$Slots {
        default: {
            item: T,
            active: boolean,
            redirect: () => void,
        };
    }
    interface $$Events {
        change: T;
    }
	export let items: T[] = [];
    export let pathSelector : (item: T) => string;
    export let match: number = 0; // 0 = exact, >0 = from start
    let activeIndex: number = -1;

    let paths: string[] = [];

    const dispatch = createEventDispatcher<$$Events>();

    let currentPath: string = "";

    $: updatePaths();

    onMount(() => {
        currentPath = window.location.pathname;
        onNavigate();
	});
    
	afterNavigate(({ to }) => {
        currentPath = window.location.pathname;
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
        activeIndex = paths.findIndex(path => isActive(path));
        dispatch('change', items[activeIndex]);
	}

    function updatePaths() {
        paths = items.map(item => pathSelector(item));
    }

</script>
<div class="navigation">
    {#each items as item, i}
        <slot {item} active={i == activeIndex} redirect={() => goto(paths[i])}/>
    {/each}
</div>

<style global lang="postcss">
</style>
