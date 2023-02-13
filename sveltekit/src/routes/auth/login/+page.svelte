<script lang="typescript">
	import TextInput from '$comps/controls/TextInput.svelte';
	import { Icons } from '$comps/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { Auth } from '$lib/api';
	import Button, { ButtonAlignment, ButtonVariant } from '$comps/controls/Button.svelte';
	import Alert, { AlertVariant } from '$comps/general/Alert.svelte';
	import { setHeaders } from '$lib/http';
	import { authenticated } from '$src/store';
	import { redirectAuthed } from '$routes/+layout.svelte';

	let username: string = '';
	let password: string = '';
	let error: string = '';

	if (import.meta.env.VITE_MODE === 'DEV') {
		username = import.meta.env.VITE_LOGIN_USERNAME;
		password = import.meta.env.VITE_LOGIN_PASSWORD;
	}

	async function login() {
		console.log('login');
		Auth.login({ username, password })
			.then(async (resp: App.Database.Auth.Token) => {
				setHeaders({ Authorization: `Bearer ${resp.access_token}` });
				authenticated.set(true);
				goto(redirectAuthed);
			})
			.catch((msg: App.Lib.RequestError) => {
				console.log('error', msg);
				error = msg.error;
			});
	}
</script>


	<div class="flex flex-col space-y-4">
		<h1 class="text text-heading text-center">{$_('routes.auth.login.title')}</h1>
		<TextInput bind:value={username} name="username" />
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
	</div>


<style global lang="postcss">
</style>
