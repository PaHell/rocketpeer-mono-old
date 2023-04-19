<script lang="typescript">
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import Overlay from '$src/components/controls/Overlay.svelte';
	import { onDestroy } from 'svelte';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import { Webcam } from '$src/lib/webcam';
	import { _ } from 'svelte-i18n';
	
	enum State {
		Init,
		Error,
		Streaming,
		Viewing
	}
	export let value: string | undefined = undefined;
	let classes = '';
	export {classes as class};
	let preview: string | undefined;

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

	function savePhoto(close: () => void) {
		value = preview;
		preview = undefined;
		close();
	}
</script>


	<Overlay
		position="top-end"
		on:open={onOpen}
		on:close={onClose}
		class="picture-input {classes}"
	>
		<svelte:fragment slot="item" let:toggle>
			<Button variant={ButtonVariant.Secondary} on:click={toggle}>
				{#if value}
					<img id="photo" src={value} alt="" />
				{:else}
					<Icon name={Icons.NoImage} class="large" />
					<p class="text">{$_('lib.controls.picture_input.none')}</p>
				{/if}
			</Button>
		</svelte:fragment>
		<svelte:fragment slot="menu" let:close>
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
						icon={Icons.Home}
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
						on:click={() => savePhoto(close)}
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
