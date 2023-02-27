<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { UserStatus } from '$src/components/user/user';
	import UserView from '$src/components/user/UserView.svelte';
	import { RoleColor } from '$src/lib/enum';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let search = "";

	type ServerRoleView = App.Database.Servers.ServerRole & {
		users: App.Database.User[];
	};

	let roles: ServerRoleView[] = data.roles
		.sort((a, b) => a.order - b.order)
		.map(role => {
			return { ...role, users: [] };
		});
	const roleOnline : ServerRoleView = {
		id: -2,
		server_id: -2,
		name: "Online",
		color: RoleColor._Online,
		order: -2,
		users: [],
	};
	const roleOffline : ServerRoleView = {
		id: -1,
		server_id: -1,
		name: "Offline",
		color: RoleColor._Offline,
		order: -1,
		users: [],
	};
	for (let su of data.server_users) {
		const user = data.all_users.find(u => u.id === su.user_id);
		if (!user) continue;
		if (user.status === UserStatus.Offline) {
			roleOffline.users.push(user);
			continue;
		}
		const rolesUsers = data.rolesUsers.filter(ru => ru.server_user_id === su.user_id);
		const highestRole = roles.find(r => rolesUsers.find(ru => ru.server_role_id === r.id));
		if (highestRole) {
			if (!highestRole.users) {
				highestRole.users = [];
			}
			highestRole.users.push(user);
		} else {
			roleOnline.users.push(user);
		}
	}
	roles.push(roleOnline);
	roles.forEach(role => role.users = role.users.sort((a, b) => a.status - b.status));
	roles.push(roleOffline);

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
<main id="server-text" class="fill">
	<div>
		<slot />
	</div>
	<div class="list-users">
		{#each roles as role}
			<p class="text bold {role.color}">{role.name}</p>
			{#each role.users as user}
				<UserView {user} variant={ButtonVariant.Transparent} showStatus />
			{/each}
		{/each}
	</div>
</main>


<style global lang="postcss">
	#server-text {
		@apply flex;
		& > div {
			@apply overflow-hidden;
			&:first-child {
				flex: 3 2 auto;
			}
			&:nth-child(2) {
				@apply border-l
				bg-gray-100 dark:bg-gray-800
				border-gray-300 dark:border-gray-700;
				flex: 1 1 20rem;
			}
		}
	}
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
