<script lang="typescript">
	import Overlay from "$src/components/controls/Overlay.svelte";
    import Button from '$src/components/controls/Button.svelte';
    import SelectLanguage from '$src/components/controls/selects/SelectLanguage.svelte';
    import SelectTheme from '$src/components/controls/selects/SelectTheme.svelte';
    import { Icons } from '$src/components/general/Icon.svelte';
    import { _ } from 'svelte-i18n';
	import Checkbox from "$src/components/controls/Checkbox.svelte";

    let devToolsOpened = false;
    let outlinesEnabled = false;

    function toggleOutlines() {
        outlinesEnabled = !outlinesEnabled;
        document.body.classList.toggle('outlines', outlinesEnabled);
    }

</script>

<template>
    <Overlay
        bind:opened={devToolsOpened}
        position="bottom-end"
        class="overlay-dev-tools"
        >
        <svelte:fragment slot="item" let:toggle>
            <Button icon={Icons.DevTools} active={devToolsOpened} on:click={toggle} />
        </svelte:fragment>
        <svelte:fragment slot="menu">
            <p class="text text-center">{$_('routes.dev_tools')}</p>
            <SelectTheme />
            <Checkbox value={outlinesEnabled} text="Outline" on:change={toggleOutlines} />
            <SelectLanguage />
        </svelte:fragment>
    </Overlay>
</template>

<style global lang="postcss">
    body.outlines * {
        outline: .5px solid fuchsia;
    }
    .overlay-dev-tools {
		@apply fixed right-4 z-40;
		top: calc((100% - 2.5rem) / 2);
		& > menu > main {
			@apply space-y-2
      		p-2 overflow-auto;
		}
	}
</style>
