<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { UserStatus } from '$src/components/user/user';
	import UserView from '$src/components/user/UserView.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let search = "";

	const groups: [UserStatus, string][]  = [
		[UserStatus.Online, "Online"],
		[UserStatus.Away, "Abwesend"],
		[UserStatus.Busy, "Beschäftigt"],
		[UserStatus.Offline, "Offline"],
	]

	const grouped: [string, App.Database.User[]][] = groups.map(g => [g[1], data.users.filter(u => u.status === g[0])]);
</script>


<header>
	<div>
		<Icon name={Icons.TextChannel} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">{data.channel.name}</p>
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
			class="ml-2"/>
	</div>
</header>
<main class="fill">
	<div>
		<slot />
	</div>
	<div class="list-users">
		{#if data.users}
			{#each grouped as group}
				<p class="text sec bold">{group[0]}</p>
				{#each group[1] as user}
					<UserView {user} variant={ButtonVariant.Transparent} showStatus />
				{/each}
			{/each}
		{/if}
	</div>
</main>


<style global lang="postcss">
	.text-input-search {
		@apply w-48;
	}
	.list-users {
		@apply flex flex-col p-2;

		& > .text {
			@apply p-1 text-label uppercase;
			letter-spacing: .25px;
			&:not(:first-child) {
				@apply mt-2;
			}
		}

		& > .button.user-display {
			@apply h-12 px-1 text-left border-transparent shadow-none;
			& > .user-image {
				@apply border-gray-300 dark:border-gray-600;
			}
		}

	}
</style>
