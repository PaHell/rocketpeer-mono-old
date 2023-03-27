<script lang="typescript" context="module">
    import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import { Icons } from "$src/components/general/Icon.svelte";
	import ImageIcon from "$src/components/views/ImageIcon.svelte";
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
                <ImageIcon
                    src={data._server_user.user.image}
                    alt="Image of {data._server_user.display_name ?? data._server_user.user.display_name}"
                    placeholder={Icons.User}
                    status={data._server_user.user.status} />
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
            & > .image-icon {
                @apply mb-1;
            }
        }
    }
</style>