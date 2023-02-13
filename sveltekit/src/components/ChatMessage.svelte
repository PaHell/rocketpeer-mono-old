<script lang="typescript" context="module">
    import UserImage from "$comps/user/UserImage.svelte";
    import Button, { ButtonAlignment, ButtonVariant } from "$comps/controls/Button.svelte";
    import moment from "moment";
	import { locale } from "$src/lib/i18n";
	import { onMount } from "svelte";
	import { time } from "$lib/time";
</script>

<script lang="typescript">
    export let data: App.Database.Chat.Message;

    locale.subscribe((locale) => {
        if (!locale) return; 
        moment.locale(locale.moment);
    });
</script>

<div class="chat-message">
    {#if data._user}
        <UserImage user={data._user} />
    {/if}
    <main>
        <p class="text bold">{data._user?.display_name}</p>
        <p class="text tri text-label">{$time(data.created_at).format()}</p>
        <p class="text col-span-2">{data.content}</p>
    </main>
</div>

<style global lang="postcss">
    .chat-message {
        @apply flex items-start p-2
        border-y border-transparent
        transition-colors;
        &:hover {
            @apply bg-gray-100 dark:bg-gray-900
            border-gray-300 dark:border-gray-700;
        }
        &:active {
            @apply bg-gray-200 dark:bg-gray-900
            border-gray-300 dark:border-gray-700;
        }
        &:first-child {
            @apply mt-2;
        }
        & > .user-image {
            @apply flex-none mr-2
            border-gray-300 dark:border-gray-600;
        }
        & > main {
            @apply flex-1 grid grid-cols-2 items-center;
            margin-top: -.0875rem;
            grid-template-columns: 1fr auto;
            & > .text {
                @apply leading-tight;
            }
        }
    }
</style>