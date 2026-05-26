export const localeIds = [
	'en-US',
	'ar-SA',
	'de-DE',
	'es-ES',
	'fr-FR',
	'hu-HU',
	'it-IT',
	'lt-LT',
	'pl-PL',
	'ru-RU',
	'tr-TR',
	'uk-UA'
] as const;

export type LocaleId = (typeof localeIds)[number];
