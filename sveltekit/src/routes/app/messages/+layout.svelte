<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { getContext, onMount, setContext } from 'svelte';
	import { mobile } from '$src/lib/viewSize';
	import Navigation from "$src/components/controls/navigation/Navigation.svelte";
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import NavigationItem from '$src/components/controls/navigation/NavigationItem.svelte';
	import UserView from '$src/components/views/user/View.svelte';
	import VoiceConnection from '$src/components/views/VoiceConnection.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import VoiceChannel from '$src/components/views/channel/VoiceChannel.svelte';
	import TextChannel from '$src/components/views/channel/TextChannel.svelte';
	import { playSound, Sounds } from '$src/components/controls/MusicPlayer.svelte';
	
	export let data: LayoutData;

	function open(chat: App.DB.Chat) {
		goto(`/app/messages/${chat.id}/text`);
	}
</script>


<aside id="sidebar" class="layout-pane items-stretch">
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
	<div class="fill list-users">
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
		{#each data.chats as chat}
			<UserView user={chat.users?.[0]}
				variant={ButtonVariant.Card}
				active={$page.params.chat_id == chat.id}
				on:click={() => open(chat)}
				showStatus />
		{/each}
	</div>
	<VoiceConnection user={data.user}/>
</aside>
<div id="content" class="layout-pane items-stretch">
	<slot/>
</div>


<style global lang="postcss">
</style>
