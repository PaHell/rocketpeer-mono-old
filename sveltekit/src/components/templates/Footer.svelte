<script lang="ts">
</script>

<footer class="footer">
    <p class="text sec">
        {@html import.meta.env.VITE_COPYRIGHT}
        {@html import.meta.env.VITE_COMPANY}
        <span class="tri">All rights reserved.</span>
    </p>
    <a href="/docs" target="_blank">Documentation</a>
    <a href="/privacy" target="_blank">Privacy Policy</a>
</footer>

<style global lang="postcss">
    .footer {
        @apply w-full flex items-center p-2;
        & > .text {
            @apply flex-1 text-label;
            & > span {
                @apply text-tri dark:text-dark-tri;
            }
        }
    }
</style>