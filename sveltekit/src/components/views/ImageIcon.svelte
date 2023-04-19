<script lang="typescript" context="module">
    import Icon, { Icons } from "$src/components/general/Icon.svelte";
	import { UserStatus, UserStatusColors } from "$src/lib/enum";
</script>

<script lang="typescript">
    let classes = "";
    export { classes as class };
    export let src: string | null = null;
    export let alt = "";
    export let placeholder: Icons = Icons.NoImage;
    export let counter = 0;
    export let status: UserStatus | undefined = undefined;
</script>

<div class="image-icon {classes}">
    <div>
        {#if src}
            <img {src} {alt} />
        {:else}
            <Icon name={placeholder} class="sec" />
        {/if}
    </div>
    {#if status != undefined}
        <div class="status {UserStatusColors[status]}"></div>
    {/if}
    {#if counter}
        <p class="text counter">{counter}</p>
    {/if}
</div>

<style lang="postcss" global>
    .image-icon {
        @apply w-10 h-10 rounded-full;
        & > div:first-child {
            @apply h-full w-full overflow-hidden
            rounded-[inherit]
            flex items-center justify-center;
            & > img {
                @apply object-cover
                min-h-full min-w-full;
            }
        }
        & > .status {
            @apply w-4 h-4 relative
            top-[-1rem] right-[-1.75rem]
            border-2 border-gray-100 dark:border-gray-800
            rounded-full;
        }
    }
</style>