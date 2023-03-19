<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import { getContext, onMount, setContext } from 'svelte';
	import { mobile } from '$lib/viewSize';
	import Navigation from "$src/components/controls/Navigation.svelte";
	import Footer from "$src/components/templates/Footer.svelte";
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Logo from '$src/components/Logo.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import UserImage from '$src/components/user/UserImage.svelte';
	import UserView from '$src/components/user/UserView.svelte';
	import VoiceConnection from '$src/components/user/VoiceConnection.svelte';
	import { connectedVoiceChannel } from '$src/store';
	import VoiceChannel from '$src/components/VoiceChannel.svelte';
	import TextChannel from '$src/components/TextChannel.svelte';
	import { playSound, Sounds } from '$src/components/MusicPlayer.svelte';
	
	export let data: LayoutData;
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
	<div class="fill list-channel-groups">
		{#each data.messages as entry}
			<UserView user={entry[0]} variant={ButtonVariant.Transparent} showStatus />
		{/each}
	</div>
	<VoiceConnection user={data.user}/>
</aside>
<div id="content" class="layout-pane items-stretch">
	<slot/>
</div>


<style global lang="postcss">
</style>
