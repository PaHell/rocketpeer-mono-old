<script lang="typescript" context="module">
    import UserImage from "$comps/user/UserImage.svelte";
    import Button, { ButtonVariant } from "$comps/controls/Button.svelte";
</script>

<script lang="typescript">
    export let user: App.Database.User;
    export let variant: ButtonVariant = ButtonVariant.Transparent;
    export let showStatus = false;
</script>

<template>
    <Button
        {variant}
        class="user-display"
        on:click={() => console.log("clicked")}>
        <UserImage {user} {showStatus} />
        <main>
            <p class="text bold ellipsis">{user.display_name}</p>
            <p class="text text-label sec ellipsis">#{user.username}</p>
        </main>
    </Button>
</template>

<style global lang="postcss">
    .user-display {
        @apply items-center justify-start;
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