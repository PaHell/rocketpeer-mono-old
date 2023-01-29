<script lang="ts" context="module">
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import Overlay, { OverlayPosition } from '$comps/controls/Overlay.svelte';
	import { createEventDispatcher, onDestroy, onMount, SvelteComponent } from 'svelte';
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Alert, { AlertVariant } from '$comps/general/Alert.svelte';
	import { Webcam } from '$lib/webcam';
	import { _ } from 'svelte-i18n';

	enum State {
		Init,
		Error,
		Streaming,
		Viewing
	}
</script>

<script lang="ts">
	export let value: string | undefined = undefined;
	export let css: string = '';
	let preview: string | undefined;

	let refOverlay: SvelteComponent | undefined;
	let webcam: Webcam | undefined;
	let video: HTMLVideoElement | undefined;

	let currentState = State.Init;

	onDestroy(() => {
		if (!webcam) return;
		webcam.destroyStream();
	});

	function onOpen() {
		if (!video) return;
		webcam = new Webcam(video);
		currentState = State.Init;
		webcam
			.createStream()
			.then(() => {
				currentState = State.Streaming;
			})
			.catch((err) => {
				console.error(err);
				currentState = State.Error;
			});
	}

	function onClose() {
		if (!webcam) return;
		preview = undefined;
		webcam.destroyStream();
		currentState = State.Init;
	}

	async function retake() {
		if (!webcam) return;
		currentState = State.Init;
		preview = undefined;
		await webcam.createStream();
		currentState = State.Streaming;
	}

	function takePicture() {
		if (!webcam) return;
		preview = webcam.makeSnapshot();
		webcam.destroyStream();
		currentState = State.Viewing;
	}

	function savePhoto() {
		value = preview;
		preview = undefined;
		refOverlay?.close();
	}
</script>


	<Overlay
		bind:this={refOverlay}
		position={OverlayPosition.Right}
		on:open={onOpen}
		on:close={onClose}
		class="picture-input {css}"
	>
		<svelte:fragment slot="item">
			<Button variant={ButtonVariant.Secondary} on:click={refOverlay.toggleOpened}>
				{#if value}
					<img id="photo" src={value} alt="" />
				{:else}
					<Icon name={Icons.NoImage} class="large" />
					<p class="text">{$_('lib.controls.picture_input.none')}</p>
				{/if}
			</Button>
		</svelte:fragment>
		<svelte:fragment slot="menu">
			{#if preview}
				<img id="photo" src={preview} alt="" />
			{/if}
			<video bind:this={video}>
				<track kind="captions" />
				<p class="text">{$_('lib.controls.picture_input.video_not_avail')}</p>
			</video>
			<footer>
				{#if currentState === State.Init}
					<p class="text">{$_('lib.controls.picture_input.init')}</p>
				{:else if currentState === State.Error}
					<Alert
						variant={AlertVariant.Danger}
						title="messages.errors.error"
						text="lib.controls.picture_input.cam_not_avail"
					/>
				{:else if currentState === State.Streaming}
					<Button
						text="lib.controls.picture_input.take_picture"
						icon={Icons.TakePicture}
						variant={ButtonVariant.Primary}
						on:click={takePicture}
					/>
				{:else if currentState === State.Viewing}
					<Button
						text="lib.controls.picture_input.retake"
						icon={Icons.Undo}
						variant={ButtonVariant.Secondary}
						on:click={retake}
					/>
					<Button
						text="lib.controls.picture_input.save"
						icon={Icons.SaveChanges}
						variant={ButtonVariant.Primary}
						on:click={savePhoto}
					/>
				{/if}
			</footer>
		</svelte:fragment>
	</Overlay>


<style global lang="postcss">
	.picture-input {
		@apply w-48;
		& > .button {
			@apply w-48 h-48 p-0
      flex-col justify-center items-center
      rounded-full overflow-hidden;
			& > img {
				@apply object-cover min-h-full;
			}
			& > .icon {
				@apply m-0 mb-1 !important;
			}
			& > .text {
				@apply flex-initial mb-2 !important;
			}
		}
		& > menu {
			@apply flex justify-items-stretch items-center;
			& > main {
				@apply items-center flex-shrink-0;

				& > * {
					@apply border-inherit;
					&:last-child {
						@apply border-t;
					}
				}
				& > video {
				}
				& > canvas {
				}
				& > footer {
					@apply w-full flex justify-center p-2 mt-[-1px] relative;
					& > .button {
						&:not(:last-child) {
							@apply mr-2;
						}
					}
				}
			}
		}
	}
</style>
