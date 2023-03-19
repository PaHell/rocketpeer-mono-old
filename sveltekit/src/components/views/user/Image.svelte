<script lang="typescript" context="module">
    import Icon, { Icons } from "$src/components/general/Icon.svelte";
	import { UserStatusColors } from "$src/lib/enum";
</script>

<script lang="typescript">
    export let user: App.Database.User | undefined;
    export let showStatus = false;
    export let small = false;
</script>

<div class="user-image" class:small>
    {#if user}
        {#if user.img}
            <img src={user.img} alt={'Profile image of ' + user.display_name} />
        {:else}
            <Icon name={Icons.UserImagePlaceholder} class="sec {small ? 'small': ''}" />
        {/if}
        {#if showStatus}
            <div class="status {UserStatusColors[user.status]}"></div>
        {/if}
    {/if}
</div>

<style lang="postcss" global>
    .user-image {
        @apply w-10 h-10
        rounded-full border
        bg-gray-100 dark:bg-gray-800
        border-gray-300 dark:border-gray-800;
        & > img {
            @apply object-cover;
        }
        & > .icon {
            @apply w-10 m-[-1px]
            text-center leading-10;
        }
        & > .status {
            @apply w-4 h-4 -mt-4 ml-6 relative
            border-2 border-gray-100 dark:border-gray-800
            rounded-full;
        }

        &.small {
            @apply w-8 h-8;
            & > .icon {
                @apply w-8 leading-8;
            }
        }
    }
</style>