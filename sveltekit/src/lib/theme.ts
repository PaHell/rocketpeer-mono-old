import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Theme {
	text: string;
	class: string;
}

export const themes: Theme[] = [
	{
		text: 'lib.controls.themes.dark',
		class: 'dark'
	},
	{
		text: 'lib.controls.themes.light',
		class: 'light'
	},
	{
		text: 'lib.controls.themes.os',
		class: ''
	}
];
export const theme = (function () {
	const { set, subscribe } = writable<Theme | undefined>();
	if (browser) {
		if ('theme' in localStorage) {
			// user set theme
			const theme = themes.find((t) => t.class === localStorage.theme);
			if (theme) setTheme(theme);
		} else {
			setTheme(themes[2]); // os pref
		}
	}
	function setTheme(theme: Theme) {
		// update store
		set(theme);
		// clear all other theme classes
		document.documentElement.classList.remove(
			...themes.map((t) => t.class).filter((t) => t.length)
		);
		// save & apply
		if (theme.class) {
			// user set theme
			document.documentElement.classList.add(theme.class);
			localStorage.setItem('theme', theme.class);
		} else {
			// os pref
			document.documentElement.classList.add(
				window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			);
			localStorage.removeItem('theme');
		}
		/// apply
	}
	return {
		set: setTheme,
		subscribe
	};
})();
