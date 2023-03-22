<script lang="typescript" context="module">
    import UserImage from "$src/components/views/user/Image.svelte";
    import Button, { ButtonAlignment, ButtonVariant } from "$src/components/controls/Button.svelte";
    import moment from "moment";
	import { locale } from "$src/lib/i18n";
	import { createEventDispatcher, onMount } from "svelte";
	import { time } from "$src/lib/time";
	import TextInput from "$src/components/controls/TextInput.svelte";
	import { debounce } from "$src/lib/helpers";
	import { afterNavigate } from "$app/navigation";
	import { Icons } from "$src/components/general/Icon.svelte";
	import { PayloadType } from "$src/lib/enum";
</script>

<script lang="typescript">
    interface $$Events {
        message: string;
    }

    let input = "message";
	let refInput: TextInput<string> | undefined;
	let refChat: HTMLElement | undefined;
	let showChatScrollButton = false;

	const debouncedOnChatScroll = debounce(onChatScroll, 250);
    const dispatch = createEventDispatcher<$$Events>();

	window.onfocus = onChannelChange;
	afterNavigate(onChannelChange);

	function onChannelChange() {
		refInput?.focus();
		refChat?.scrollTo(0, refChat.scrollHeight);
		onChatScroll();
	}

	function onChatScroll() {
		if (!refChat) return;
		showChatScrollButton = refChat.scrollHeight - refChat.scrollTop - refChat.clientHeight
			> refChat.clientHeight / 2;
	}

	function scrollToBottom() {
		if (!refChat) return;
		refChat.scrollTo({ top: refChat.scrollHeight, left: 0, behavior: "smooth" });
	}

	function sendMessage() {
		input = "";
        dispatch("message", input);
		refInput?.focus();
	}
</script>

<template>
    <div class="chat-view">
        <main bind:this={refChat} on:scroll={debouncedOnChatScroll}>
            <div class="spacer"/>
			<slot/>
            <div class="scroll-top">
                <Button
                    icon={Icons.Down}
                    active={showChatScrollButton}
                    variant={ButtonVariant.None}
                    on:click={scrollToBottom}/>
            </div>
        </main>
        <footer>
            <Button
                icon={Icons.Add}
                class="mr-2"
                variant={ButtonVariant.Secondary}
                on:click={sendMessage}/>
            <TextInput
                bind:this={refInput}
                name="message"
                bind:value={input}
                on:enter={sendMessage}
                hideLabel
                autofocus
                disableAutocomplete/>
            <Button
                icon={Icons.Send}
                variant={ButtonVariant.Primary}
                on:click={sendMessage}/>
        </footer>
    </div>
</template>

<style global lang="postcss">
    .chat-view {
		@apply flex flex-col
		h-full overflow-hidden;

		& > main {
			@apply flex-1 overflow-y-auto
			flex flex-col items-stretch py-2;
			& > .spacer {
				@apply flex-1;
			}
			& > .chat-message {
				@apply flex-none;
			}
			& > .scroll-top {
				@apply flex justify-center;
				& > .button {
					@apply fixed z-0 rounded-full
					w-10 h-10 items-center justify-center
					bg-gray-100 dark:bg-gray-700
					border-gray-300 dark:border-gray-600
					shadow transition-all duration-200
					text-icon-sec dark:text-icon-dark-sec;
					will-change: transform;
					bottom: calc(3.5rem + 4px + 1px + 0.5rem);
					&:not(.active) {
						@apply opacity-50 translate-y-14;
					}
					&.active {
						@apply opacity-100 translate-y-0;
						&:hover,
						&:active {
							@apply bg-gray-200 dark:bg-gray-600 
							text-icon-pri dark:text-icon-dark-pri;
						}
						&:active {
							@apply scale-90;
						}
					}
				}
			}
		}

		& > footer {
			@apply flex-none flex p-2 relative z-10
			bg-gray-100 dark:bg-gray-800
			border-t border-gray-300 dark:border-gray-700;
			& > .input-container {
				@apply flex-1 mr-2;
			}
		}
	}
</style>