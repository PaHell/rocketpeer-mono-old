<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount, SvelteComponent } from 'svelte';
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { debounce } from '$src/lib/helpers';
	import ChatView from '$src/components/views/chat/View.svelte';
	import ChatMessage from "$src/components/views/chat/Message.svelte";

	export let data: LayoutData;
</script>

<template>
	<ChatView>
		{#if data.messages}
			{#each data.messages as message (message.id)}
				<ChatMessage
					sender={message._sender}
					time={message.created_at}
					type={message.type}
					payload={message.payload}/>
			{/each}
		{/if}
	</ChatView>
</template>


<style global lang="postcss">
</style>
