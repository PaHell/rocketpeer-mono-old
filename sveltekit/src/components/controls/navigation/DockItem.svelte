<script lang="typescript" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { createEventDispatcher, onMount } from 'svelte';
    import { match as _match } from '$src/lib/navigation';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
</script>

<script lang="typescript">
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

    let active: boolean = false;
    let currentPath: string = "";
    let size = 64;
    let guid = Math.trunc(Math.random() * Math.pow(16, 6)).toString(16);
    let imgSize: [number, number] = [0, 0];

    onMount(() => {
        if (img) {
            const image = new Image();
            image.src = img;
            image.decode().then(() => {
                imgSize = [image.width, image.height];
            });
        }
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

<template>
    <NavigationItem
        {path}
        {match}
        let:active
        let:redirect>
        <button
            class="dock-item {classes}"
            class:active
            on:click={redirect}>
            <svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect x=".5" y=".5" width={size - 1} height={size - 1} />
            </svg>
            {#if img}
                <svg viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect x=".5" y=".5" width={size - 1} height={size - 1} fill="url(#pattern_{guid})"/>
                    <defs>
                        <pattern id="pattern_{guid}" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#img_{guid}"/>
                        </pattern>
                        <image id="img_{guid}" width="1" height="1" preserveAspectRatio="xMidYMid slice" xlink:href={img}/>
                    </defs>
                </svg>
            {/if}
            {#if !img && icon}
                <Icon name={icon} class="lg"/>
            {/if}
            <slot/>
        </button>
    </NavigationItem>
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
            }
            &:first-child {
                @apply fill-gray-200 dark:fill-gray-800
                stroke-1 stroke-gray-300 dark:stroke-gray-700;
            }
        }
        & > .icon {
            @apply leading-[4rem] text-icon-large;
        }
        & > .logo > svg {
            @apply transition-[fill];
        }

        &:hover {
            & > svg {
                & > rect {
                    rx: 16;
                }
                &:first-child {
                    @apply fill-accent-500
                    stroke-accent-600 dark:stroke-accent-400;
                }
                &:nth-child(2) {
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
            & > svg {
                &:first-child {
                    @apply fill-accent-500
                    stroke-accent-400;
                }
                &:nth-child(2) {
                    @apply fill-gray-700 dark:fill-gray-700
                    stroke-gray-700 dark:stroke-gray-700;
                }
            }
        }
    }
</style>
