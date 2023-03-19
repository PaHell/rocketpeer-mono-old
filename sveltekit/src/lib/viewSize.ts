import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { isMobile } from '$src/lib/helpers';

export interface ViewSize {
	text: string;
	class: string;
}

export const sizes: ViewSize[] = [
	{
		text: 'lib.controls.view_sizes.auto',
		class: ''
	},
	{
		text: 'lib.controls.view_sizes.mobile',
		class: 'mobile'
	},
	{
		text: 'lib.controls.view_sizes.desktop',
		class: 'desktop'
	}
];
const classes = {
	auto: sizes[0].class,
	mobile: sizes[1].class,
	desktop: sizes[2].class
};
export const mobile = writable<boolean>(false);
export const viewSize = (function () {
	const { set, subscribe } = writable<ViewSize | undefined>();
	if (browser) {
		if ('view_size' in localStorage) {
			// user set size
			const size = sizes.find((t) => t.class === localStorage.theme);
			if (size) setViewSize(size);
		} else {
			setViewSize(sizes[0]); // auto
		}
	}
	function setViewSize(size: ViewSize) {
		// update store
		set(size);
		// clear all other size classes
		document.documentElement.classList.remove(...sizes.map((t) => t.class).filter((t) => t.length));
		// save & apply
		if (size.class) {
			// user set size
			document.documentElement.classList.add(size.class);
			localStorage.setItem('view_size', size.class);
			mobile.set(size.class === classes.mobile);
		} else {
			// auto layout
			localStorage.removeItem('view_size');
			const hasTouch = window.matchMedia('(any-pointer: coarse)').matches;
			const isSmall = window.innerWidth <= 768;
			const isTablet = hasTouch && !isSmall;
			const mobileView = isMobile() || isSmall || !isTablet;
			document.documentElement.classList.add(mobileView ? classes.mobile : classes.desktop);
			mobile.set(mobileView);
		}
	}
	return {
		set: setViewSize,
		subscribe
	};
})();
