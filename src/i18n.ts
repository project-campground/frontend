import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import locales from './supportedLocales.json';
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../lang/${locale}.json`)).default
  };
})