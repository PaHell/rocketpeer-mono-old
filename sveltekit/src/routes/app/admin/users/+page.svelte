<script lang="typescript">
	import Button from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';
	import Table from '$src/components/table/Table.svelte';
	import Column from '$src/components/table/Column.svelte';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
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
			<Table bind:items={data.users} css="col-span-2" let:ctx>
				<Column title="ID" width="5rem" class="" sortByKey="id">
				  <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
				</Column>
				<Column title="Username" sortByKey="username">
					<p class="text">{ctx.item.username}</p>
				</Column>
				<Column title="First Name" sortByKey="first_name">
				  <p class="text">{ctx.item.first_name}</p>
				</Column>
				<Column title="Last Name" sortByKey="last_name">
				  <p class="text">{ctx.item.last_name}</p>
				</Column>
				<Column title="E-Mail" sortByKey="email">
					<p class="text">{ctx.item.email}</p>
				</Column>
				<Column title="Privacy Level" sortByKey="privacy_level">
					<p class="text">{ctx.item.privacy_level}</p>
				</Column>
				<Column title="Created at" sortByKey="created_at">
					<p class="text">{ctx.item.created_at}</p>
				</Column>
			  </Table>
		</div>
	</main>
</template>


<style lang="postcss">
</style>
