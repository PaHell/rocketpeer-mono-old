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

	let usernameEmail = '';
	let password = '';
	let error = '';

	if (import.meta.env.DEV) {
		usernameEmail = import.meta.env.VITE_LOGIN_USERNAME;
		password = import.meta.env.VITE_LOGIN_PASSWORD;
	}

	async function login() {
		console.log('login');
		UserResource.login({ usernameEmail, password })
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
	<h1 class="text text-heading text-center">{$_('routes.auth.login.title')}</h1>
	<TextInput bind:value={usernameEmail} name="usernameEmail" />
	<TextInput bind:value={password} name="password" type="password" />
	{#if error}
		<Alert title="messages.errors.error" text={error} variant={AlertVariant.Danger} />
	{/if}
	<Button
		text="routes.auth.login.title"
		variant={ButtonVariant.Primary}
		align={ButtonAlignment.Center}
		on:click={login}
	/>
	<p class="text">
		<span>New here?</span>
		<a href="/auth/register" class="text-link">{$_('routes.auth.register.title')}</a>
	</p>
	{#if import.meta.env.DEV}
		<Button
			text="Bypass Login"
			variant={ButtonVariant.Secondary}
			align={ButtonAlignment.Center}
			on:click={() => goto('/app')}
		/>
	{/if}
</template>


<style global lang="postcss">
</style>
