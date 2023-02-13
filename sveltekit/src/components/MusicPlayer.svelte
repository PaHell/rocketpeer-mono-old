<script lang="typescript" context="module">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    const sources = [
        "/sounds/beep.mp3",
        "/sounds/dial.mp3",
        "/sounds/melancholy-ui-chime.mp3",
        "/sounds/ping.mp3",
        "/sounds/ringtone.mp3",
        "/sounds/telephone-connect.mp3",
        "/sounds/ui_correct_button.mp3",
        "/sounds/ui-click.mp3",
        "/sounds/userinterface.mp3",
    ];
</script>

<script lang="typescript">
	import Button, { ButtonVariant } from "./controls/Button.svelte";
	import { Icons } from "./general/Icon.svelte";

    let audio: HTMLAudioElement | undefined;
    let isPlaying = false;

    onMount(() => {
        if (!browser) return;
        audio = new Audio();
        audio.volume = 0.5;
        audio.preload = "auto";
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("canplaythrough", onCanPlay);
    });

    function onCanPlay() {
        if (!audio || isPlaying) return;
        audio.play();
        isPlaying = true;
    }

    function play(source: string) {
        if (!audio || isPlaying) return;
        if (audio.currentSrc === source) {
            onCanPlay();
            return;
        }
        audio.src = source;
        audio.currentTime = 0;
        //audio.load();
    }

    function onEnded() {
        isPlaying = false;
    }
</script>

<template>
    <div class="music-player">
        <Button
            variant={ButtonVariant.Secondary}
            icon={Icons.Home}
            text="Play"
            active={isPlaying}
            on:click={() => play(sources[2])}/>
    </div>
</template>

<style global lang="postcss">
</style>
