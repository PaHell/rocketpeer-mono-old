<script lang="ts">
	import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import Navigation from "$src/components/controls/Navigation.svelte";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import Icon, { Icons } from "$src/components/general/Icon.svelte";

    let activeNavItem = -1;
    const navItems = [
        {
            title: "Friends",
            path: "/app/messages/friends/all",
        },
        {
            title: "Pending",
            path: "/app/messages/friends/pending",
        },
        {
            title: "Blocked",
            path: "/app/messages/friends/blocked",
        },
    ];
</script>

<template>
    <header>
        <div>
            <Icon name={Icons.Users} class="text-icon-sec dark:text-icon-dark-sec"/>
            <p class="text text-headline ellipsis">{navItems[activeNavItem]?.title}</p>
            <Navigation
                class="flex"
                pathSelector={item => item.path}
                items={navItems}
                bind:active={activeNavItem}
                let:item
                let:active
                let:redirect>
                <Button
                    variant={ButtonVariant.Secondary}
                    text={item.title}
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