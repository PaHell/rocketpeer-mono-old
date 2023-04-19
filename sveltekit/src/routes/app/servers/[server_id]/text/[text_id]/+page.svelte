<script lang="typescript">
	import ChatMessage from '$src/components/views/chat/Message.svelte';
	import type { LayoutData } from './$types';
	import ChatView from '$src/components/views/chat/View.svelte';

	export let data: LayoutData;
</script>

<template>
	<ChatView>
		{#each data.messages as message}
			<ChatMessage
				sender={message._server_user?.user}
				display_name={message._server_user?.display_name}
				time={message.created_at}
				type={message.type}
				payload={message.payload}/>
		{/each}
	</ChatView>
</template>


<style global lang="postcss">
</style>
