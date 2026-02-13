import supportedLocales from '../../../supportedLocales.json';
import { mappifyMessages, type NestedMessages } from './util';

export { IntlProvider } from './provider';

const localeCache: Record<string, NestedMessages> = {};

export function getSupportedLocales() {
    return supportedLocales;
}

export function isLocaleSupported(locale: string) {
    return supportedLocales.includes(locale);
}

export function loadLocale(locale: string): Promise<NestedMessages> {
    if (!isLocaleSupported(locale)) {
        throw new Error(`Locale ${locale} is not supported`);
    }
    if (localeCache[locale]) {
        return Promise.resolve(localeCache[locale]);
    }
    return new Promise((resolve, reject) => {
        fetch(`/locales/${locale}.json`)
            .then((response) => response.json())
            .then((messages) => {
                localeCache[locale] = mappifyMessages(messages);
                resolve(mappifyMessages(messages));
            })
            .catch((error) => {
                reject(error);
            });
    })
}

