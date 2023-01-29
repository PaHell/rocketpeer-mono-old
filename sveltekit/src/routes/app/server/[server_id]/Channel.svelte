<script lang="ts" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
</script>

<script lang="ts">
	export let channel: App.Database.ServerModels.Channel;
</script>

<NavigationItem
    path={channel.is_voice_channel
        ? `/app/server/${channel.server_id}/voice/${channel.id}`
        : `/app/server/${channel.server_id}/text/${channel.id}`
    }
    let:active
    let:redirect>
    <div class="channel">
        <Button
            variant={ButtonVariant.Card}
            icon={channel.is_voice_channel
                ? Icons.VoiceChannel
                : Icons.TextChannel}
            text={channel.name}
            on:click={redirect}
            {active}/>
        <Button
            variant={ButtonVariant.Transparent}
            icon={Icons.Settings}
            on:click={() => {}}/>
    </div>
</NavigationItem>

<style global lang="postcss">
    .channel {
        @apply flex mb-2 px-2;
        & > .button {
            &:first-child {
                @apply w-full px-2;
            }
            &:last-child {
                @apply relative opacity-0 pointer-events-none
                bg-transparent rounded-l-none
                transition-[opacity];
                margin-left: calc(-2.5rem - 2px);
            }
            & > .icon {
                @apply mr-2;
            }
        }
        &:hover > .button:last-child {
            @apply opacity-100 pointer-events-auto
            border-gray-300 dark:border-gray-800;
        }
    }
</style>
