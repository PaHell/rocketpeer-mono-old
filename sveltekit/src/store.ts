import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const authenticated = writable<boolean>(false);
export const connectedVoiceChannel = writable<App.Database.Servers.Channels.VoiceChannel | undefined>();