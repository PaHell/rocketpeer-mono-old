<script lang="ts">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import UserDisplay from '$src/components/user/UserDisplay.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let search = "";
</script>


<header>
	<div>
		<Icon name={data.channel.icon} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">{data.channel.title}</p>
		<div class="divider"></div>
		<p class="text sec ellipsis">Ganz schön hässlich hier, aber waren Sie schonmal in Karlsruhe?</p>
	</div>
	<div>
		<TextInput bind:value={search}
			name="search"
			hideLabel />
	</div>
</header>
<main>
	<div>
		<slot />
	</div>
	<div>
		{#if data.users_online}
			{#each data.users_online as user}
				<UserDisplay {user} />
			{/each}
		{/if}
	</div>
</main>


<style global lang="postcss">
</style>
