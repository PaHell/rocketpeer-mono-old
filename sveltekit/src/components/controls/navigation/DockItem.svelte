<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
    import { match as _match } from '$src/lib/navigation';
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
	export let title = "Title";
	export let path = "";
    export let match = 0; // 0 = exact, >0 = from start
    let classes = "";
    export { classes as class };

    let ref: HTMLButtonElement;
    const svgRectArgs = {
        x: .5,
        y: .5,
        width: 63,
        height: 63,
    };
    let active = false;
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
        <svg viewBox="0 0 {svgRectArgs.width + 1} {svgRectArgs.height + 1}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            {#if img}
                <rect class="img" {...svgRectArgs} fill="url(#pattern_{guid})"/>
                <defs>
                    <pattern id="pattern_{guid}" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#img_{guid}"/>
                    </pattern>
                    <image id="img_{guid}" width="1" height="1" preserveAspectRatio="xMidYMid slice" xlink:href={img}/>
                </defs>
            {:else}
                <rect class="bg" {...svgRectArgs} />
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
            & > * {
                transition: rx .25s ease-in-out, fill .25s ease-in-out, stroke .25s ease-in-out;
                will-change: rx, fill, stroke;
            }
            & > rect {
                @apply stroke-1 stroke-gray-300 dark:stroke-gray-800;
                rx: 32;
                &.bg {
                    @apply fill-gray-300 dark:fill-gray-800;
                }
                &.img {
                    @apply stroke-gray-200 dark:stroke-gray-700;
                }
            }
        }
        & > .icon {
            @apply leading-[4rem] text-icon-large relative;
        }
        &:hover,
        &:active,
        &.active {
            & > svg > rect {
                rx: 16;
            }
        }
        &:hover {
            & > svg > rect {
                &.bg {
                    @apply fill-white dark:fill-gray-800
                    stroke-gray-300 dark:stroke-gray-700;
                }
            }
        }
        &:active {
            @apply transform scale-95 ease-in-out;
        }
        &.active {
            & > svg {
                @apply drop-shadow;
                & > rect {
                    &.bg {
                        @apply fill-accent-500 dark:fill-accent-500
                        stroke-accent-600 dark:stroke-accent-400;
                    }
                }
            }
            & > .icon {
                @apply text-white;
            }
            & > .logo > svg {
                @apply fill-white;
            }
        }
    }
</style>
