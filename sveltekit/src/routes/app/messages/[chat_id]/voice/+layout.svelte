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
		<Icon name={Icons.VoiceChannel} class="text-icon-sec dark:text-icon-dark-sec"/>
		<p class="text text-headline ellipsis">{data.partner?.display_name}</p>
	</div>
	<!--
		<div>
		</div>
	-->
</header>
<slot />


<style global lang="postcss">
</style>
