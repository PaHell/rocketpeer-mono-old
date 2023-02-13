<script lang="typescript" context="module">
    import Badge, { BadgeVariant } from "./general/Badge.svelte";
    import UserImage from "./user/UserImage.svelte";
	import Button, { ButtonStyle, ButtonVariant } from '$src/components/controls/Button.svelte';
	import NavigationItem from '$src/components/controls/NavigationItem.svelte';
	import { Icons } from '$src/components/general/Icon.svelte';
	import { createEventDispatcher } from "svelte";
	import { connectedVoiceChannel } from "$src/store";
</script>

<script lang="typescript">
    interface $$Events {
        settings: () => void;
    }
	export let channel: App.Database.Servers.Channels.VoiceChannel;
    const dispatch = createEventDispatcher<$$Events>();

    function connectVoice(channel: App.Database.Servers.Channels.VoiceChannel, redirect: () => void) {
        if ($connectedVoiceChannel?.id !== channel.id) connectedVoiceChannel.set(channel);
        else redirect();
    }
</script>

<NavigationItem
    path={`/app/server/${channel.server_id}/voice/${channel.id}`}
    let:redirect>
    <div class="channel">
        <Button
            variant={ButtonVariant.Transparent}
            style={ButtonStyle.Card}
            icon={Icons.VoiceChannel}
            text={channel.name}
            on:click={() => connectVoice(channel, redirect)}
            active={$connectedVoiceChannel?.id === channel.id}/>
        <Button
            variant={ButtonVariant.Transparent}
            icon={Icons.Settings}
            on:click={() => dispatch('settings')}/>
    </div>
    {#if channel._voice_users}
        <div class="channel-users">
            {#each channel._voice_users as vcu}
                <Button
                    variant={ButtonVariant.Transparent}
                    style={ButtonStyle.Card}
                    class={vcu.is_talking ? 'talking' : ''}>
                    <UserImage user={vcu._user} small/>
                    <p class="text ellipsis flex-1">{vcu._user?.display_name}</p>
                    {#if vcu.is_live}
                        <Badge
                            text="live"
                            variant={BadgeVariant.Danger}/>
                    {/if}
                </Button>
            {/each}
        </div>
    {/if}
</NavigationItem>

<style global lang="postcss">
</style>
