<script lang="ts">
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Button, { ButtonVariant } from '$src/components/controls/Button.svelte';

    interface $$Events {
        retry: void;
        reload: void;
    }

    export let title: string = 'general.error';
    export let error: App.API.RequestError;

    const dispatch = createEventDispatcher<$$Events>();
</script>

<template>
    <div class="request-error">
        <Alert
            variant={AlertVariant.Danger}
            {title}
            message={error.message}>
            {#if import.meta.env.DEV}
                <p class="indent text">Details:</p>
                <p class="indent text font-mono">{@html JSON
                    .stringify(error, null, 2)
                    .replaceAll("\n", "<br/>")
                    .replaceAll("  ", "&nbsp;&nbsp;")}
                </p>
            {/if}
            <div class="bar-button">
                <Button
                    variant={ButtonVariant.Transparent}
                    text="components.request_error.retry"
                    on:click={() => dispatch("retry")}/>
                <Button
                    variant={ButtonVariant.Transparent}
                    text="components.request_error.reload"
                    on:click={() => dispatch("reload")}/>
            </div>
        </Alert>
    </div>
</template>

<style global lang="postcss">
    .request-error {
        @apply flex flex-col items-center justify-center
        h-full p-4;
        & > .alert {
            @apply w-full max-w-sm;
            & > .bar-button {
                @apply flex space-x-2 pt-1 pb-2 pl-6;
            }
        }
    }
</style>