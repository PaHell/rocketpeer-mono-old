<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
    import { match as _match } from '$src/lib/navigation';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
</script>

<script lang="typescript">
    interface $$Events {
        active: number;
    }
    interface $$Slots {
        default: {};
    }
	export let icon: Icons | undefined = undefined;
	export let img: string | null = null;
	export let title: string = "Title";
	export let path: string = "";
    export let match: number = 0; // 0 = exact, >0 = from start
    let classes = "";
    export { classes as class };

    let ref: HTMLButtonElement;
    let active: boolean = false;
    let size = 64;
    let guid = Math.trunc(Math.random() * Math.pow(16, 6)).toString(16);

    const dispatch = createEventDispatcher<$$Events>();

    onMount(onNavigate);
	afterNavigate(onNavigate);

	function onNavigate() {
        active = _match(path, window.location.pathname, match);
        if (active) dispatch("active", ref.getBoundingClientRect().top);
	}

</script>

<template>
    <button
        bind:this={ref}
        class="dock-item {classes}"
        class:active
        on:click={() => goto(path)}>
        <svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect class="bg" x=".5" y=".5" width={size - 1} height={size - 1} />
            {#if img}
                <rect class="img" x=".5" y=".5" width={size - 1} height={size - 1} fill="url(#pattern_{guid})"/>
                <defs>
                    <pattern id="pattern_{guid}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#img_{guid}"/>
                    </pattern>
                    <image id="img_{guid}" width="1" height="1" preserveAspectRatio="xMidYMid slice" xlink:href={img}/>
                </defs>
            {/if}
        </svg>
        {#if !img && icon}
            <Icon name={icon} class="lg"/>
        {/if}
        <slot/>
    </button>
</template>

<style global lang="postcss">
    .dock-item {
        @apply transition-transform;
        
        & > * {
            @apply w-16 h-16;
            &:not(:first-child) {
                @apply -mt-16;
            }
        }

        & > svg {
            & > rect {
                rx: 32;
                transition: rx .25s;
                will-change: rx, fill, stroke;
                &.bg {
                    @apply fill-gray-200 dark:fill-gray-800
                    stroke-1 stroke-gray-300 dark:stroke-gray-700;
                }
            }
        }
        & > .icon {
            @apply leading-[4rem] text-icon-large;
        }
        &:hover,
        &.active {
            & > svg > rect {
                rx: 16;
            }
        }

        &:hover {
            & > svg > rect {
                &.bg {
                    @apply fill-accent-500
                    stroke-accent-600 dark:stroke-accent-400;
                }
                &.img {
                    @apply stroke-gray-700 dark:stroke-gray-700;
                }
            }
            & > .icon {
                @apply text-white;
            }
            & > .logo > svg {
                @apply fill-white;
            }
        }
        &:active {
            @apply transform scale-95 ease-in-out;
            & > svg > rect {
                &.bg {
                    @apply fill-accent-500
                    stroke-accent-400;
                }
                &.img {
                    @apply stroke-gray-700 dark:stroke-gray-700;
                }
            }
        }
    }
</style>
