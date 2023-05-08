<script lang="typescript" context="module">
    import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import { Icons } from "$src/components/general/Icon.svelte";
	import ImageIcon from "$src/components/views/ImageIcon.svelte";
</script>

<script lang="typescript">
    export let data: App.DB.ServerUser;

    let displayName = "";
    $: displayName = data.display_name ?? data.user?.display_name ?? "";
</script>

<template>
    <div class="user-profile">
        {#if data.user}
            <header>
                <ImageIcon
                    src={data.user.image}
                    alt="Image of {displayName}"
                    placeholder={Icons.User}
                    status={data.user.status} />
            </header>
            <main>
                <p class="text bold ellipsis">{displayName}</p>
                <p class="text text-label sec ellipsis">#{data.user.username}</p>
            </main>
        {/if}
    </div>
</template>

<style global lang="postcss">
    .user-profile {
        @apply flex flex-col;
        & > header {
            @apply border-b h-0 px-2 py-8 mb-8
            bg-gray-200 dark:bg-gray-700
            border-gray-300 dark:border-gray-700;
            & > .image-icon {
                @apply w-16 h-16 border
                bg-gray-50 dark:bg-gray-600
                border-gray-300 dark:border-gray-700
                shadow-sm;
            }
        }
        & > main {
            @apply px-2 pt-1 pb-3;
        }
    }
</style>