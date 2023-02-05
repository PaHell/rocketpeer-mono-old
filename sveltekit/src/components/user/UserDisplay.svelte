<script lang="ts" context="module">
    import UserImage from "./UserImage.svelte";
    
    export enum UserStatus {
        Online,
        Busy,
        Away,
        Offline,
    }
    
    const classes = [
        "bg-success-500",
        "bg-warning-500",
        "bg-danger-500",
        "bg-transparent",
    ];
</script>

<script lang="ts">
	import Button, { ButtonAlignment, ButtonVariant } from "../controls/Button.svelte";

    export let user: App.Database.User;
    export let variant: ButtonVariant = ButtonVariant.Card;
</script>

<Button
    {variant}
    class="user-display"
    on:click={() => console.log("clicked")}>
    <UserImage {user} />
    <div class="status {classes[user.status]}"></div>
    <main>
        <p class="text bold ellipsis">{user.display_name}</p>
        <p class="text text-label sec ellipsis">#{user.username}</p>
    </main>
</Button>

<style global lang="postcss">
    .user-display {
        @apply items-center justify-start;
        & > .user-image {
            @apply flex-none;
        }
        & > .status {
            @apply w-3 h-3 ml-7 mt-6
            absolute
            rounded-full;
        }
        & > main {
            @apply ml-1 flex-1 overflow-hidden;
            & > .text {
                @apply leading-none;
                &:first-child {
                    @apply mt-[-2px];
                }
                &:last-child {
                    @apply mt-[2px];
                }
            }
        }
    }
</style>