<script lang="ts">
	import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import Icon, { Icons } from "$src/components/general/Icon.svelte";
	import Navigation, { type NavItem } from "$src/components/controls/navigation/Navigation.svelte";

    let activeNavItem: number = 0;
    const navItems: NavItem[] = [
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
                class="navigation-tabs"
                items={navItems}
                pathSelector={i => i.path}
                bind:active={activeNavItem}
				let:item
				let:active
				let:redirect>
				<Button
					variant={ButtonVariant.Card}
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
            <p class="text sec">Friends Activities</p>
        </div>
    </main>
</template>

<style global lang="postcss">

</style>