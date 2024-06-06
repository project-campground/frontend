import createMiddleware from 'next-intl/middleware'
import locales from './supportedLocales.json';

export default createMiddleware({
  locales: locales,
  defaultLocale: "en-US"
});

export const config = {
  matcher: ["/", `/(${locales.join("|")})/:path*`]
}