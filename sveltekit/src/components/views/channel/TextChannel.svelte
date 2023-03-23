<script lang="typescript" context="module">
    import Badge, { BadgeVariant } from "$src/components/general/Badge.svelte";
    import UserImage from "$src/components/views/user/Image.svelte";
	import Button, { ButtonStyle, ButtonVariant } from '$src/components/controls/Button.svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { createEventDispatcher } from "svelte";
</script>

<script lang="typescript">
    interface $$Events {
        settings: () => void;
    }
	export let channel: App.DB.TextChannel;
    const dispatch = createEventDispatcher<$$Events>();
</script>

<NavigationItem
    path={`/app/server/${channel.server_id}/text/${channel.id}`}
    let:active
    let:redirect>
    <div class="channel" class:opened={active}>
        <Button
            variant={ButtonVariant.Transparent}
            style={ButtonStyle.Card}
            icon={Icons.TextChannel}
            text={channel.name}
            on:click={redirect}
            {active}/>
        <Button
            variant={ButtonVariant.Transparent}
            icon={Icons.Settings}
            class="button-settings"
            on:click={() => dispatch('settings')}/>
        <div class="spacer"></div>
    </div>
</NavigationItem>

<style global lang="postcss">
    .channel {
        @apply flex mb-2 pl-2 pr-3
        transition-[padding-right];
        width: calc(100% + .25rem);
        &.opened {
            @apply pr-0;
            & > .button.button-settings {
                @apply mr-1 rounded-r-none;
                margin-left: calc(-2.75rem - 1px);
            }
            & > .spacer {
                @apply w-1;
            }
        }
        &:hover {
            & > .button {
                &:first-child {
                    @apply bg-white dark:bg-gray-800
                    border-gray-300 dark:border-gray-700;
                }
                &.button-settings {
                    @apply opacity-100;
                }
            }
        }
        & > .button {
            &:first-child {
                @apply w-full px-2;
                & > .icon {
                    @apply mr-2;
                }
            }
            &.button-settings {
                @apply relative pointer-events-none
                rounded-l-none opacity-0;
                margin-left: calc(-2.5rem - 2px);
            }
        }
        & > .spacer {
            @apply w-0 bg-danger-500;
        }
    }
    .channel-users {
        @apply flex flex-col px-2 -mt-1;
        & > .button {
            @apply pl-1 pr-2;
            &:last-child {
                @apply mb-2;
            }
            & > .user-image {
                @apply mr-2;
            }
            &.talking > .user-image {
                @apply border-accent-500 ring-1 ring-accent-500;
            }
        }
    }
</style>
