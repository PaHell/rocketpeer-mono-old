<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { UserStatus } from '$src/lib/enum';
	import UserView from '$src/components/views/user/View.svelte';
	import UserProfile from '$src/components/views/user/Profile.svelte';
	import { ServerTagColor } from '$src/lib/enum';
	import type { PageData } from './$types';
	import Floating, { FloatingAlignment } from '$src/components/general/Floating.svelte';

	export let data: PageData;
	let search = "";

	let refUserMenu: Floating<App.DB.ServerUser>;
	let currentShownUser: App.DB.ServerUser | undefined = undefined;
	let showUsers = true;

	type ServerTagView = [App.DB.ServerTag, App.DB.ServerUser[]];

	let tagDict: ServerTagView[] = data.tags
		.sort((a, b) => a.order - b.order)
		.map(role => {
			return [role, []];
		});
	const tagOnline : ServerTagView = [{
		id: -2,
		server_id: -2,
		name: "Online",
		color: ServerTagColor._Online,
		order: -2,
	}, []];
	const tagOffline : ServerTagView = [{
		id: -1,
		server_id: -1,
		name: "Offline",
		color: ServerTagColor._Offline,
		order: -1,
	}, []];
	for (let su of data.server_users) {
		if (!su.user) continue;
		if (su.user.status === UserStatus.Offline) {
			tagOffline[1].push(su);
			continue;
		}
		const highest = tagDict.find(r => data.tags.find(ru => ru.id === r[0].id));
		if (highest) {
			if (!highest[1]) {
				highest[1] = [];
			}
			highest[1].push(su);
		} else {
			tagOnline[1].push(su);
		}
	}
	tagDict.push(tagOnline);
	tagDict.forEach(kvp => kvp[1] = kvp[1].sort((a, b) => a.status - b.status));
	tagDict.push(tagOffline);
	tagDict = tagDict.filter(kvp => kvp[1].length > 0);

</script>


<header>
	<div>
		<Icon name={Icons.TextChannel} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">{data.channel?.name}</p>
		<div class="divider"></div>
		<p class="text sec ellipsis">Ganz schön hässlich hier, aber waren Sie schonmal in Karlsruhe?</p>
	</div>
	<div>
		<Button variant={ButtonVariant.Transparent}
			icon={Icons.Pinned}
			class="ml-2"/>	
		<Button variant={ButtonVariant.Transparent}
			icon={Icons.Notification}
			class="ml-2"/>		
		<TextInput bind:value={search}
			name="search"
			class="text-input-search ml-2"
			hideLabel />
		<Button variant={ButtonVariant.Transparent}
			icon={Icons.Users}
			active={showUsers}
			on:click={() => showUsers = !showUsers}
			class="ml-2"/>
	</div>
</header>
<main id="server-text">
	<slot />
</main>
{#if showUsers}
	<aside class="list-users">
		{#each tagDict as [tag, server_users]}
			<p class="text bold {tag.color}">{tag.name}</p>
			{#each server_users as su}
				<UserView
					user={su.user}
					display_name={su.display_name}
					variant={ButtonVariant.Transparent}
					showStatus
					on:click={(e) => refUserMenu.toggle({
						reference: e.target.closest('.user-view'),
						context: su,
					})} />
			{/each}
		{/each}
		<Floating
			bind:this={refUserMenu}
			bind:currentContext={currentShownUser}
			alignment={FloatingAlignment.RightLeft}>
			<svelte:fragment slot="menu">
				{#if !currentShownUser}
					<p>Loading...</p>
				{:else}
					<UserProfile
						user={currentShownUser.user}
						display_name={currentShownUser.display_name}/>
				{/if}
			</svelte:fragment>
		</Floating>
	</aside>
{/if}


<style global lang="postcss">
	#server-text {
		@apply flex;
		& > div {
			@apply overflow-hidden;
			&:first-child {
				flex: 3 2 auto;
			}
			&:nth-child(2) {
				@apply overflow-y-auto
				border-l
				bg-gray-100 dark:bg-gray-800
				border-gray-300 dark:border-gray-700;
				flex: 1 1 20rem;
			}
		}
	}
	.text-input-search {
		@apply w-48;
	}
</style>
