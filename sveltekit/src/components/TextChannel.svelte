<script lang="typescript" context="module">
    import Badge, { BadgeVariant } from "./general/Badge.svelte";
    import UserImage from "./user/UserImage.svelte";
	import Button, { ButtonStyle, ButtonVariant } from '$src/components/controls/Button.svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { createEventDispatcher } from "svelte";
</script>

<script lang="typescript">
    interface $$Events {
        settings: () => void;
    }
	export let channel: App.Database.Servers.Channels.TextChannel;
    const dispatch = createEventDispatcher<$$Events>();
</script>

<NavigationItem
    path={`/app/server/${channel.server_id}/text/${channel.id}`}
    let:active
    let:redirect>
    <div class="channel">
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
            on:click={() => dispatch('settings')}/>
    </div>
</NavigationItem>

<style global lang="postcss">
    .channel {
        @apply flex mb-2 px-2;
        &:hover > .button {
            @apply bg-gray-200 border-gray-300
            dark:bg-gray-800 dark:border-gray-700;
            &:last-child {
                @apply pointer-events-auto
                border-gray-300 dark:border-gray-700
                opacity-100;
            }
        }
        & > .button {
            @apply transition-colors !important;
            &:first-child {
                @apply w-full px-2;
                & > .icon {
                    @apply mr-2;
                }
            }
            &:last-child {
                @apply relative pointer-events-none
                rounded-l-none opacity-0
                transition-all;
                margin-left: calc(-2.5rem - 2px);
            }
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
