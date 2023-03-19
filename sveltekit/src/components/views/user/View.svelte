<script lang="typescript" context="module">
    import Image from "$src/components/views/user/Image.svelte";
    import Button, { ButtonStyle, ButtonVariant } from "$src/components/controls/Button.svelte";
</script>

<script lang="typescript">
    export let user: App.Database.User;
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
        <Image {user} {showStatus} />
        <main>
            <p class="text bold ellipsis">{user.display_name}</p>
            <p class="text text-label sec ellipsis">#{user.username}</p>
        </main>
    </Button>
</template>

<style global lang="postcss">
    .button.user-view {
        @apply items-center justify-start text-left;
        & > .user-image {
            @apply flex-none;
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