<script lang="typescript" context="module">
    import Button, { ButtonStyle, ButtonVariant } from "$src/components/controls/Button.svelte";
	import { Icons } from "$src/components/general/Icon.svelte";
	import ImageIcon from "$src/components/views/ImageIcon.svelte";
</script>

<script lang="typescript">
    export let user: App.DB.User;
    export let display_name: string | null = null;
    export let variant: ButtonVariant = ButtonVariant.Transparent;
    export let style: ButtonStyle = ButtonStyle.None;
    export let active = false;
    export let showStatus = false;
</script>

<template>
    <Button
        {variant}
        {active}
        style={ButtonStyle.Card}
        class="user-view"
        on:click>
        <ImageIcon
            src={user.image}
            alt="Image of {display_name}"
            placeholder={Icons.User}
            status={user.status} />
        <main>
            <p class="text bold ellipsis">{display_name ?? user.display_name}</p>
            <p class="text text-label sec ellipsis">#{user.username}</p>
        </main>
    </Button>
</template>

<style global lang="postcss">
    .button.user-view {
        @apply items-center justify-start text-left;
        & > .image-icon {
            @apply flex-none
            bg-gray-300 dark:bg-gray-700;
        }
        & > main {
            @apply ml-1 flex-1 overflow-hidden;
            & > .text {
                @apply leading-tight;
                &:first-child {
                    @apply mt-[-3px];
                }
                &:last-child {
                    @apply mt-[-2px];
                }
            }
        }
    }
</style>