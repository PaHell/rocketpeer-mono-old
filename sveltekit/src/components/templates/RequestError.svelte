<script lang="ts">
	import Alert, { AlertVariant } from '$src/components/general/Alert.svelte';
	import { _ } from 'svelte-i18n';
	import Message from '../views/chat/Message.svelte';

    export let title: string = 'general.error';
    export let error: App.API.RequestError;
</script>

<template>
    <div class="request-error">
        <Alert
            variant={AlertVariant.Danger}
            {title}
            message={error.message}>
            <p class="indent text">Details:</p>
            <p class="indent text font-mono">{@html JSON
                .stringify(error, null, 2)
                .replaceAll("\n", "<br/>")
                .replaceAll("  ", "&nbsp;&nbsp;")}
            </p>
        </Alert>
    </div>
</template>

<style global lang="postcss">
    .request-error {
        @apply flex flex-col items-center justify-center h-full p-4;
        & > .alert {
            @apply w-full max-w-sm;
        }
    }
</style>