<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { default as Icon, Icons } from '$src/components/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount, SvelteComponent } from 'svelte';
	import ChatMessage from '$src/components/views/chat/Message.svelte';
	import type { LayoutData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { debounce } from '$src/lib/helpers';
	import ChatView from '$src/components/views/chat/View.svelte';

	export let data: LayoutData;
</script>

<template>
	<ChatView>
		{#if data.channel.messages}
			{#each data.channel.messages as message}
				<ChatMessage
					sender={message._user}
					time={message.created_at}
					type={message.type}
					payload={message.payload}/>
			{/each}
		{/if}
	</ChatView>
</template>


<style global lang="postcss">
</style>
