<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import UserView from '$src/components/views/user/View.svelte';
	
	export let data: LayoutData;

	function open(chat: App.DB.Chat) {
		goto(`/app/messages/${chat.id}/text`);
	}
</script>

<template>	
	<header>
		<div>
			<p class="pl-2 text font-bold">Messages</p>
		</div>
		<div>
			<Button
			icon={Icons.Add}
			variant={ButtonVariant.Transparent}
			on:click={() => {}}
			/>
		</div>
	</header>
	<nav class="list-users">
		<NavigationItem
			path={'/app/messages/friends/all'}
			match={3}
			let:active
			let:redirect>
			<Button
				class="user-view mb-[1px]"
				variant={ButtonVariant.Card}
				icon={Icons.User}
				text="Friends"
				{active}
				on:click={redirect}/>
		</NavigationItem>
		<p class="text tri bold">Messages</p>
		{#each data.chats as chat}
			<UserView user={chat.users?.[0]}
				variant={ButtonVariant.Card}
				active={$page.params.chat_id == chat.id}
				on:click={() => open(chat)}
				showStatus />
		{/each}
	</nav>
	<slot/>
</template>


<style global lang="postcss">
</style>
