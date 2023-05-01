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
            <ImageIcon
                src={data.user.image}
                alt="Image of {displayName}"
                placeholder={Icons.User}
                status={data.user.status} />
            <p class="text bold ellipsis">{displayName}</p>
            <p class="text text-label sec ellipsis">#{data.user.username}</p>
        {/if}
    </div>
</template>

<style global lang="postcss">
    .user-profile {
        @apply flex flex-col;
    }
</style>