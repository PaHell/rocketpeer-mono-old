<script lang="typescript">
	import SelectViewSize from '$src/components/controls/selects/SelectViewSize.svelte';
	import SelectLanguage from '$src/components/controls/selects/SelectLanguage.svelte';
	import SelectTheme from '$src/components/controls/selects/SelectTheme.svelte';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { _ } from 'svelte-i18n';
	import { authenticated } from '$src/store';
	import { goto } from '$app/navigation';

	function logout() {
		authenticated.set(false);
		goto('/');
	}
</script>


<template>
	<p class="text pri headline">Variants</p>
	<section>
		<p class="text">Primary</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			variant={ButtonVariant.Primary}
			on:click={logout}/>
		<p class="text">Secondary</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			variant={ButtonVariant.Secondary}
			on:click={logout}/>
		<p class="text">Transparent</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			variant={ButtonVariant.Transparent}
			on:click={logout}/>
		<p class="text">Card</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			variant={ButtonVariant.Card}
			on:click={logout}/>
	</section>
	<p class="text pri headline">Active</p>
	<section>
		<p class="text">Primary</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			active={true}
			variant={ButtonVariant.Primary}
			on:click={logout}/>
		<p class="text caption">Lorem ipsum dolor</p>
	</section>
	<section>
		<p class="text">Secondary</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			active={true}
			variant={ButtonVariant.Secondary}
			on:click={logout}/>
		<p class="text caption">Lorem ipsum dolor</p>
	</section>
	<section>
		<p class="text">Transparent</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			active={true}
			variant={ButtonVariant.Transparent}
			on:click={logout}/>
	</section>
	<section>
		<p class="text">Card</p>
		<Button
			icon={Icons.Logout}
			text="routes.app.settings.logout"
			class="w-full"
			active={true}
			variant={ButtonVariant.Card}
			on:click={logout}/>
	</section>
</template>


<style lang="postcss">
</style>
