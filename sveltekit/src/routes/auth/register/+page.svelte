<script lang="typescript">
	import TextInput from '$src/components/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { UserResource } from '$src/lib/api';
	import Button, { ButtonAlignment, ButtonVariant } from '$src/components/controls/Button.svelte';
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import { setHeaders } from '$src/lib/http';
	import { authenticated } from '$src/store';
	import { redirectAuthed } from '$src/routes/+layout.svelte';

	let username = '';
	let display_name = '';
	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';

	let error = '';

	async function register() {
		console.log('register');
		UserResource.register({
			username,
			display_name,
			first_name,
			last_name,
			email,
			password
		})
			.then(async (resp: App.DB.AccessToken) => {
				console.log({resp});
				setHeaders({ Authorization: `Bearer ${resp.access_token}` });
				authenticated.set(true);
				goto(redirectAuthed);
			})
			.catch((msg: App.API.RequestError) => {
				console.log('error', msg);
				error = JSON.stringify(msg, null, 2); // msg.error;
			});
	}
</script>


<template>
	<h1 class="text text-heading text-center">{$_('routes.auth.login.title')}</h1>
	<TextInput bind:value={username} name="username" />
	<TextInput bind:value={display_name} name="display_name" />
	<div class="flex space-x-4">
		<TextInput bind:value={first_name} name="first_name" class="flex-1" />
		<TextInput bind:value={last_name} name="last_name" class="flex-1" />
	</div>
	<TextInput bind:value={email} name="email" />
	<TextInput bind:value={password} name="password" type="password" />
	{#if error}
		<Alert title="messages.errors.error" text={error} variant={AlertVariant.Danger} />
	{/if}
	<Button
		text="routes.auth.register.title"
		variant={ButtonVariant.Primary}
		align={ButtonAlignment.Center}
		on:click={register}
	/>
	<p class="text">
		<span>Already signed up?</span>
		<a href="/auth/login" class="text-link">{$_('routes.auth.login.title')}</a>
	</p>
</template>


<style global lang="postcss">
</style>
