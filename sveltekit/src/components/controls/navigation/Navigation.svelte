<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Icons } from '$src/components/general/Icon.svelte';
    import { match as _match } from '$src/lib/navigation';
    export interface NavItem {
        title: string;
        icon?: Icons;
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
        change: {
            item: T,
            index: number,
        };
    }
	export let items: T[] = [];
    export let pathSelector : (item: T) => string;
    export let match: number = 0; // 0 = exact, >0 = from start
    export let active: number = -1;
    let classes = "";
    export { classes as class };

    let paths: string[] = [];

    const dispatch = createEventDispatcher<$$Events>();

    let currentPath: string = "";

    $: updatePaths();

    onMount(() => {
        onNavigate();
	});
    
	afterNavigate(() => {
        onNavigate();
	});
    
	function onNavigate() {
        currentPath = window.location.pathname;
        active = paths.findIndex(path => _match(path, currentPath, match));
        dispatch('change', {
            item: items[active],
            index: active,
        });
	}

    function updatePaths() {
        paths = items.map(item => pathSelector(item));
    }

</script>
<div class="navigation {classes}">
    {#each items as item, i}
        <slot {item} active={i == active} redirect={() => goto(paths[i])}/>
    {/each}
</div>

<style global lang="postcss">
</style>
