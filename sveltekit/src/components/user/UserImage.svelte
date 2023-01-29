<script lang="ts">
	import Icon, { Icons } from "../general/Icon.svelte";

    export let user: App.Database.User | undefined;
</script>

<div class="user-image">
    {#if user?.img}
        <img src={user.img} alt={'Profile image of ' + user.display_name} />
    {:else}
        <Icon name={Icons.UserImagePlaceholder} class="sec" />
    {/if}
</div>

<style global lang="postcss">
    .user-image {
        @apply w-10 h-10 relative overflow-hidden
        flex items-center justify-center
        rounded-full border
        border-gray-300 dark:border-gray-800;
        & > img {
            @apply object-cover;
        }
    }
</style>