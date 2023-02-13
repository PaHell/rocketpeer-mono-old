<script lang="typescript">
	import Button from '$comps/controls/Button.svelte';
	import { default as Icon, Icons } from '$comps/general/Icon.svelte';
	import TextInput from '$comps/controls/TextInput.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div id="text-channel">
	<h1 class="text heading col-span-2">{$_('routes.app.server.title')}</h1>
</div>

<style lang="postcss">
	#text-channel {
		@apply flex flex-col;
	}
</style>
