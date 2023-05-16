<script lang="typescript" context="module">
    import Button, { ButtonVariant } from "$src/components/controls/Button.svelte";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import Icon, { Icons } from "$src/components/general/Icon.svelte";
	import ImageIcon from "$src/components/views/ImageIcon.svelte";
</script>

<script lang="typescript">
    export let user: App.DB.User;
    export let display_name: string | null;

    let refInput: TextInput<string> | undefined;
    let input = "";

    function sendMessage() {

    }


</script>

<template>
    <div class="user-profile">
        <header>
            <ImageIcon
                src={user.image}
                alt="Image of {user.display_name}"
                placeholder={Icons.User}
                status={user.status} />
        </header>
        <main>
            <p class="text bold">{@html
                display_name
                ? `${display_name} <wbr/>(${user.display_name})`
                : user.display_name
            }</p>
            <ul>
                <li>
                    <Icon name={Icons.Username} class="sec small"/>
                    <p class="text ellipsis">{user.username}</p>
                </li>
            </ul>
            <TextInput
                bind:this={refInput}
                name="message"
                bind:value={input}
                on:enter={sendMessage}
                hideLabel
                autofocus
                disableAutocomplete/>
        </main>
    </div>
</template>

<style global lang="postcss">
    .user-profile {
        @apply flex flex-col;
        & > header {
            @apply border-b h-0 px-2 py-8 mb-8
            bg-gray-200 dark:bg-gray-700
            border-gray-300 dark:border-gray-700;
            & > .image-icon {
                @apply w-16 h-16 border
                bg-gray-50 dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                shadow-sm;
            }
        }
        & > main {
            @apply p-2;

            & > ul {
                @apply my-2;
                & > li {
                    @apply flex items-center;
                    & > .text {
                        @apply ml-1 flex-1;
                    }
                }
            }
        }
    }
</style>