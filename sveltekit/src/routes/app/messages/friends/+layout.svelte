<script lang="ts">
	import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import Navigation from "$src/components/controls/navigation/Navigation.svelte";
	import StyledNavigation, { NavStyle, type NavGroup } from "$src/components/controls/navigation/StyledNavigation.svelte";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import Icon, { Icons } from "$src/components/general/Icon.svelte";

    let activeNavItem: [number, number] = [0, 0];
    const navItems: NavGroup[] = [
        {
            title: "",
            items: [
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
            ]
        }
    ];
</script>

<template>
    <header>
        <div>
            <Icon name={Icons.Users} class="text-icon-sec dark:text-icon-dark-sec"/>
            <p class="text text-headline ellipsis">{navItems[activeNavItem[0]].items[activeNavItem[1]]?.title}</p>
            <StyledNavigation
                items={navItems}
                style={NavStyle.Tabs}
                bind:active={activeNavItem}
                />
        </div>
        <div>
        </div>
    </header>
    <main id="messages-text" class="fill">
        <div>
            <slot />
        </div>
        <div class="list-users">
            <p class="text sec">Friends Activities</p>
        </div>
    </main>
</template>

<style global lang="postcss">

</style>