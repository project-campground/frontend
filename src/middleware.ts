import createMiddleware from 'next-intl/middleware'
import locales from './supportedLocales.json';

export default createMiddleware({
  locales: locales,
  defaultLocale: "en-US",
  localePrefix: "as-needed"
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}