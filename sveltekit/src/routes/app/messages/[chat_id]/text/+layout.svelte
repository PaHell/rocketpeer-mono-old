<script lang="typescript">
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import Icon, { Icons } from '$src/components/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let search = "";

</script>


<header>
	<div>
		<Icon name={Icons.TextChannel} class="text-icon-sec dark:text-icon-dark-sec"/>
		{#if data.chat}
			<p class="text text-headline ellipsis">{data.chat?.name ?? data.chat?.users?.map(u => u.display_name).join(", ")}</p>
			{#if data.chat?.name}
				<div class="divider"></div>
				<p class="text sec ellipsis">{data.chat?.users?.map(u => u.display_name).join(", ")}</p>
			{/if}
		{/if}
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
<main id="messages-text" class="fill">
	<div>
		<slot />
	</div>
	<div class="list-users">
	</div>
</main>


<style global lang="postcss">
	#messages-text {
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
</style>
