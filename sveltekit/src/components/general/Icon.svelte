<script lang="typescript" context="module">
	export enum Icons {
		Home = 'home-line',
		Settings = 'settings-line',
		Menu = 'menu-2-line',
		SelectDown = 'arrow-drop-down-line',
		SelectSelected = 'check-line',
		Delete = 'delete-bin-line',
		UndoDelete = 'arrow-go-back-line',
		SaveChanges = 'save-line',
		Add = 'add-line',
		OrderByAsc = 'arrow-drop-up-line',
		OrderByDesc = 'arrow-drop-down-line',
		NumberPlaceholder = 'asterisk',
		MuteSpeaker = 'customer-service-line',
		DevTools = 'code-s-slash-line',
		Logout = 'logout-box-r-line',
		NoImage = 'image-add-fill',
		Undo = 'arrow-go-back-line',
		TextChannel = 'hashtag',
		VoiceChannel = 'volume-up-line',
		Search = 'search-line',
		Send = 'send-plane-line',
		VoiceConnectionPoor = 'signal-wifi-1-fill',
		VoiceConnectionBad = 'signal-wifi-2-fill',
		VoiceConnectionMedium = 'signal-wifi-3-fill',
		VoiceConnectionGood = 'signal-wifi-fill',
		VoiceDisconnect = 'plug-line',
		Microphone = 'mic-line',
		Speakers = 'headphone-line',
		UserImagePlaceholder = 'user-6-line',
		Users = 'contacts-line',
		Notification = 'notification-line',
		Pinned = 'pushpin-line',
		Down = 'arrow-down-s-line',
		Fullscreen = 'fullscreen-line',
		Volume = 'volume-up-line',
	}
</script>

<script lang="typescript">
	export let name: Icons = Icons.Home;
	let classes: string = '';
	export { classes as class };
</script>


	<i class="icon ri-{name} {classes}" />


<style global lang="postcss">
	.icon {
		@apply block flex-shrink-0
		text-icon;
		&.sec {
			@apply text-icon-sec dark:text-icon-dark-sec;
		}
		&.tri {
			@apply text-icon-tri dark:text-icon-dark-tri;
		}
		&.large {
			@apply text-icon-large indent-0;
		}
		&.small {
			@apply text-icon-small indent-0;
		}
	}
</style>
