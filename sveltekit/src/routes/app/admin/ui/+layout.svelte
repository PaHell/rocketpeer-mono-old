<template>
    <main class="layout-admin-ui">
        <div>
            <slot/>
        </div>
    </main>
</template>

<style global lang="postcss">
    .layout-admin-ui {
        @apply p-2;
        & > div {
            @apply grid gap-[1px] items-start
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            bg-gray-300 dark:bg-gray-700;
            & > .text {
                @apply p-1 sm:col-span-2 lg:col-span-3;
                &.heading,
                &.headline {
                }
            }
            
            & > section {
                @apply p-2 bg-gray-100 dark:bg-gray-800;
            }
        }
    }
</style>