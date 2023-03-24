<script lang="typescript" context="module">
    import Image from "$src/components/views/user/Image.svelte";
    import Button, { ButtonStyle, ButtonVariant } from "$src/components/controls/Button.svelte";
</script>

<script lang="typescript">
    export let data: App.P2P.VoiceChannelUser;
</script>

<template>
    {#if data._server_user?.user}
        <Button
            class="user-voice"
            variant={ButtonVariant.None}
            on:click>
            <main>
                <Image user={data._server_user.user} />
                <p class="text bold ellipsis">{data._server_user.display_name ?? data._server_user.user.display_name}</p>
                <p class="text text-label sec ellipsis">#{data._server_user.user.username}</p>
            </main>
        </Button>
    {/if}
</template>

<style global lang="postcss">
    .button.user-voice {
        @apply h-auto px-2 py-4      
        rounded shadow-sm
        bg-white dark:bg-gray-800
        border-gray-300 dark:border-gray-700;
        & > main {
            @apply w-full flex flex-col items-center justify-center;
            & > .user-image {
                @apply mb-1;
            }
        }
    }
</style>