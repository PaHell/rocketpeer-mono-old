<script lang="typescript">
	import Button from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';
	import Table from '$src/components/table/Table.svelte';
	import Column from '$src/components/table/Column.svelte';
	import type { LayoutData } from './$types';
	import { UserPrivacyLevel, UserRole, type User } from '$src/database.d';
	import { time } from '$lib/time';
	import SelectEnum from '$src/components/controls/selects/SelectEnum.svelte';
	import { get } from 'svelte/store';
	
	export let data: LayoutData;

	let users: User[] = [
		{
			id: 1,
			username: "user1",
			first_name: "John",
			last_name: "Doe",
			email: "",
			privacy_level: UserPrivacyLevel.Private,
			role: UserRole.Default,
			created_at: new Date().toUTCString(),
			updated_at: new Date().toUTCString(),
		},
	];
</script>


<template>
	<header>
		<div>
			<Icon name={Icons.User} class="text-icon-sec dark:text-icon-dark-sec"/>
			<p class="text text-headline ellipsis">Users</p>
		</div>
		<div>
		</div>
	</header>
	<main>
		<div class="p-2">
			<Table bind:items={data.users} css="col-span-2">
				<Column title="Index" let:store>
					<p class="text sec">{get(store).index}</p>
				</Column>
				<Column title="Username" key="username"/>
				<Column title="Full Name" key="last_name" let:store>
					<p class="text">
						<span>{get(store).item.last_name ?? ""}</span>
						{#if get(store).item.first_name}
							<span class="sec">, {get(store).item.first_name}</span>
						{/if}
					</p>
				</Column>
				<Column title="E-Mail" key="email"/>
				<Column title="Privacy Level" key="privacy_level"/>
				<Column title="Role" key="role" let:store>
					<SelectEnum
						entries={Object.entries(UserRole)}
						value={get(store).item.role}
						on:change={(e) => store.updateItem("role", e.detail)}/>
				</Column>
				<Column title="Created at" key="created_at" let:store>
					<p class="text">{$time(get(store).item.created_at).fromNow()}</p>
				</Column>
			  </Table>
			  <code>
				<pre>{JSON.stringify(data.users, null, 2)}</pre>
			  </code>
		</div>
	</main>
</template>


<style lang="postcss">
</style>
