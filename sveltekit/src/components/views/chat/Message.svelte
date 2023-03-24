<script lang="typescript" context="module">
    import UserImage from "$src/components/views/user/Image.svelte";
    import Button, { ButtonAlignment, ButtonVariant } from "$src/components/controls/Button.svelte";
    import moment from "moment";
	import { locale } from "$src/lib/i18n";
	import { onMount } from "svelte";
	import { time as _time } from "$src/lib/time";
import type { PayloadType } from "$src/lib/enum";
</script>

<script lang="typescript">
    export let sender: App.DB.User | undefined;
    export let display_name: string | null = null;
    export let time: string;
    export let type: PayloadType;
    export let payload: string;

    locale.subscribe((locale) => {
        if (!locale) return; 
        moment.locale(locale.moment);
    });
</script>

<div class="chat-message">
    {#if sender}
        <UserImage user={sender} />
    {/if}
    <main>
        <p class="text bold ellipsis">{display_name ?? sender?.display_name}</p>
        <p class="text tri text-label ellipsis">{$_time(time).format()}</p>
        <p class="text col-span-2">{payload}</p>
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
            margin-top: -1px;
            grid-template-columns: 1fr auto;
            & > .text {
                @apply leading-tight;
                &.text-label {
                    @apply mt-[-5px];
                }
            }
        }
    }
</style>