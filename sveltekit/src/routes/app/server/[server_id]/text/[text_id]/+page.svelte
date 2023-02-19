<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$comps/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount, SvelteComponent } from 'svelte';
	import ChatMessage from '$src/components/ChatMessage.svelte';
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { debounce } from '$src/lib/helpers';
	import ChatView from '$src/components/ChatView.svelte';

	export let data: LayoutData;

	let input = "message";
	let refInput: TextInput<string> | undefined;
	let refChat: HTMLElement | undefined;
	let showChatScrollButton = false;

	const debouncedOnChatScroll = debounce(onChatScroll, 250);
	
	window.onfocus = onChannelChange;
	afterNavigate(onChannelChange);

	function onChannelChange() {
		refInput?.focus();
		refChat?.scrollTo(0, refChat.scrollHeight);
		onChatScroll();
	}

	function onChatScroll() {
		if (!refChat) return;
		showChatScrollButton = refChat.scrollHeight - refChat.scrollTop - refChat.clientHeight
			> 320;
	}

	function scrollToBottom() {
		if (!refChat) return;
		refChat.scrollTo({ top: refChat.scrollHeight, left: 0, behavior: "smooth" });
	}
	
	function sendMessage() {
		input = "";
		refInput?.focus();
	}
</script>

<template>
	{#if data.channel._messages}
		<ChatView>
			{#each data.channel._messages as message}
				<ChatMessage data={message}/>
			{/each}
		</ChatView>
	{/if}
</template>


<style global lang="postcss">
</style>
