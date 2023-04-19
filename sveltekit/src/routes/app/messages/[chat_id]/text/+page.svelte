<script lang="typescript">
	import type { LayoutData } from './$types';
	import ChatView from '$src/components/views/chat/View.svelte';
	import ChatMessage from "$src/components/views/chat/Message.svelte";

	export let data: LayoutData;
</script>

<template>
	<ChatView>
		{#if data.messages}
			{#each data.messages as message (message.id)}
				<ChatMessage
					sender={message._user}
					display_name={message._user?.display_name}
					time={message.created_at}
					type={message.type}
					payload={message.payload}/>
			{/each}
		{/if}
	</ChatView>
</template>


<style global lang="postcss">
</style>
