<script lang="ts">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$comps/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount, SvelteComponent } from 'svelte';
	import ChatMessage from '$src/components/ChatMessage.svelte';
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';

	export let data: LayoutData;

	let input = "message";
	let refInput: TextInput<string> | undefined;
	
	window.onfocus = focusInput;
	afterNavigate(focusInput);

	function focusInput() {
		refInput?.focus();
	}
	
	function sendMessage() {
		input = "";
		focusInput();
	}
</script>

<div id="text-channel">
	<main>
		{#if data.channel._messages}
			<div class="spacer"/>
			{#each data.channel._messages as message}
				<ChatMessage data={message}/>
			{/each}
		{/if}
	</main>
	<footer>
		<TextInput
			bind:this={refInput}
			name="message"
			bind:value={input}
			on:enter={sendMessage}
			hideLabel
			autofocus
			disableAutocomplete/>
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
		h-full overflow-hidden;

		& > main {
			@apply flex-1 overflow-y-auto
			flex flex-col items-stretch p-2;
			& > .spacer {
				@apply flex-1;
			}
			& > .chat-message {
				@apply flex-none;
			}
		}

		& > footer {
			@apply flex-none flex p-2
			border-t border-gray-300 dark:border-gray-700;
			& > .input-container {
				@apply flex-1 mr-2;
			}
		}
	}
</style>
