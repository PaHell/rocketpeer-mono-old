<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import Slider from './Slider.svelte';
	import Floating, { FloatingAlignment } from '../general/Floating.svelte';

	export let stream: MediaStream | undefined;
    
    let volume = 50;

    let video: HTMLVideoElement | undefined;
	let videoWidth = 0;
	let videoHeight = 0;

    $: if (video && stream) video.srcObject = stream;

	function onCanPlay() {
		if (!video) return;
		videoWidth = video.videoWidth;
		videoHeight = video.videoHeight;
	}

    function toggleFullscreen() {
        if (!video) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen();
        }
    }
</script>

<template>
    <div class="video-player">
        <video bind:this={video} on:canplay={onCanPlay} autoplay playsinline>
            <Alert variant={AlertVariant.Danger}
                title="Error!"
                message="Your browser does not support video streaming." />
            <track kind="captions" />
        </video>
        <footer>
            <div class="justify-start"><slot name="left"/></div>
            <div class="justify-center"><slot name="center"/></div>
            <div class="justify-end">
                <Floating alignment={FloatingAlignment.BottomTop}>
                    <svelte:fragment slot="item" let:toggle>
                        <Button variant={ButtonVariant.Transparent}
                            icon={Icons.Volume}
                            on:click={toggle}/>
                    </svelte:fragment>
                    <svelte:fragment slot="menu">
                        <p class="text">{volume}</p>
                        <Slider bind:value={volume} />
                    </svelte:fragment>
                </Floating>
                <Button variant={ButtonVariant.Transparent}
                    icon={Icons.Fullscreen}
                    on:click={toggleFullscreen} />
            </div>
        </footer>
    </div>
</template>

<style global lang="postcss">
	.video-player {
		@apply flex flex-col items-center justify-center content-center
		bg-black;
		&:hover,
		&:focus-within {
			& > footer {
				@apply opacity-100;
			}
		}
		& > video {
			@apply h-full;
		}
		& > footer {
			@apply w-full h-0 px-2 top-[-3rem] relative
			opacity-0 transition-opacity;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            & > div {
                @apply flex items-center;
                & > *:not(:last-child) {
                    @apply mr-2;
                }
                &:nth-child(1),
                &:nth-child(3) {
                    flex: 0 0 10rem;
                }
                &:nth-child(3) {
                    flex: 1 0 10rem;
                }
            }
		}
	}
</style>
