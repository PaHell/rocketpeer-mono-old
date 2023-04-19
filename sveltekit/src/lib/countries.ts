import { writable } from 'svelte/store';
import { countries as _countries } from 'country-flags-svg';

export interface Country {
	iso3: string;
	name: string;
	flag: string;
}

export const countries = (function () {
	const { set, subscribe } = writable<App.Lib.Country[]>(_countries);
	return {
		set,
		subscribe
	};
})();
