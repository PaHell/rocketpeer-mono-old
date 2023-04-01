import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const authenticated = writable<boolean>(false);
export const user = writable<App.DB.User | undefined>();
export const connectedVoiceChannel = writable<App.DB.VoiceChannel | undefined>();