import { writable } from 'svelte/store';
import { countries as _countries } from 'country-flags-svg';

export const countries = (function () {
	const { set, subscribe } = writable<App.Lib.Country[]>(_countries);
	return {
		set,
		subscribe
	};
})();
