> ⚠️ NOTE: <br/> `../lang/ru-RU.json` is a temp file for development tests. This should be removed from the project before integrating with Crowdin.
# Campground Guide to i18n

- Up for discussion but good practice is only adding the language to `./supportedLocales.json` when it has been completed.
- Languages should be connected to a "region" for example:
  - "en" > "en-US" (English - United States) or "en-GB"
  - "fr" > "fr-FR" (French - France)
  - "ru" > "ru-RU" (Russian - Russia)
  - and so forth
- If we decide to use Crowdin, the top 30 languages will be auto-populated in `../lang`
- Once a language is ready to be supported on Campground, the PR must be merged, and added to the `supportedLocales.json`

With this one JSON file, everything else is handled! :)

TODO:

  - [x] We need a locale switcher (should only load the locales in `supportedLocales.json`
  - [x] When using default locale (en-US), the path should be `/`, not `/en-US`

# Tech Used:
- [Next-Intl](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)
