<script lang="ts">
	import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import Navigation from "$src/components/controls/Navigation.svelte";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import Icon, { Icons } from "$src/components/general/Icon.svelte";

    let search = "";

    const navItems = [
        {
            title: "Friends",
            path: "/app/messages/friends",
            icon: Icons.Users
        },
        {
            title: "Pending",
            path: "/app/messages/pending",
            icon: Icons.Users
        },
    ];
</script>

<template>
    <header>
        <div>
            <Icon name={Icons.Users} class="text-icon-sec dark:text-icon-dark-sec"/>
            <p class="text text-headline ellipsis">Friends</p>
            <Navigation
                class="flex"
                pathSelector={item => item.path}
                items={navItems}
                let:item
                let:active
                let:redirect>
                <Button
                    variant={ButtonVariant.Secondary}
                    text={item.title}
                    icon={item.icon}
                    on:click={redirect}
                    {active}>
                </Button>
            </Navigation>
        </div>
        <div>
        </div>
    </header>
    <main id="messages-text" class="fill">
        <div>
            <slot />
        </div>
        <div class="list-users">
        </div>
    </main>
</template>

<style global lang="postcss">

</style>