import moment from 'moment';
import { locale, type Locale } from '$lib/i18n';
import { derived } from 'svelte/store';
import 'moment/dist/locale/en-gb';
import 'moment/dist/locale/de';

moment.defaultFormatUtc = 'LLLL';

locale.subscribe((value) => {
	if (!value) return;
	const avail = moment.locales().find((l) => l.includes(value.iso2));
	if (!avail) throw new Error(`No matching locale for iso ${value.iso2} is available`);
	moment.locale(avail);
});

export const time = derived([locale], () => (utc: string) => {
	return moment.utc(utc);
});
