<script lang="ts">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$comps/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import Gun from 'gun/gun';
	import 'gun/sea';
	import 'gun/axe';
	import type { IGun, IGunInstance, IGunChain } from 'gun/types';
	import type {IGunChainReference} from 'gun/types/chain';

	interface AppState {
		name: string
	}
	
	let input = "message";
	let messages: string[] = [];
	let gun: IGunInstance<IGunChainReference<AppState, any, 'pre_root'>> | undefined;

	onMount(() => {
		return;
		gun = new Gun<IGunChainReference<AppState, any, 'pre_root'>>({
			peers: [import.meta.env.VITE_WS_GUN]
		});
		gun.get('messages')
			.map()
			.once((message: string) => {
				messages.push(message);
				messages = [...messages];
			});
	});

	function sendMessage() {
		const index = new Date().toISOString();
		gun?.get('messages')
			.get(index)
			.put(input);
	}

	function deleteAllMessages() {
		gun?.get('messages').map().put(null);
	}
</script>

<div id="text-channel">
	<main>
		<div class="messages">
			<Button
				icon={Icons.Delete}
				variant={ButtonVariant.Secondary}
				on:click={deleteAllMessages}/>
			{#each messages as message}
				<p class="text">{message}</p>
			{/each}
		</div>
	</main>
	<footer>
		<TextInput
			name="message"
			bind:value={input}
			hideLabel
			autofocus/>
		<Button
			icon={Icons.Send}
			text="Send"
			variant={ButtonVariant.Primary}
			on:click={sendMessage}/>
	</footer>
</div>

<style global lang="postcss">
	#text-channel {
		@apply flex flex-col
		h-full;

		& > main {
			@apply flex-1 overflow-auto;
		}

		& > footer {
			@apply flex-none flex;
			& > .input-container {
				@apply flex-1 mr-2;
			}
		}
	}
</style>
