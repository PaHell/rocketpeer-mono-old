<script lang="typescript">
	import Button, { ButtonVariant } from '$comps/controls/Button.svelte';
	import Icon, { Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$src/components/controls/TextInput.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let search = "";
</script>


<header>
	<div>
		<Icon name={Icons.VoiceChannel} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">{data.channel.name}</p>
	</div>
	<div>
	</div>
</header>
<main class="fill">
	<div>
		<slot />
	</div>
</main>


<style global lang="postcss">
</style>
