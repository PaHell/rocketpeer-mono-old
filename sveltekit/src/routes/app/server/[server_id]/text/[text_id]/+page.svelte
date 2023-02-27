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
</script>

<template>
	{#if data.channel.messages}
		<ChatView messages={data.channel.messages}/>
	{/if}
</template>


<style global lang="postcss">
</style>
