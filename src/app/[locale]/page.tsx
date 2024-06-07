'use client';

import { useTranslations, useLocale } from "next-intl";
import {Select, rem, ComboboxItem} from "@mantine/core";
import locales from "../../supportedLocales.json"
import { IconLanguage } from "@tabler/icons-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Home() {
  const t = useTranslations("Home")
  const locale = useLocale();
  const icon = <IconLanguage style={{ width: rem(16), height: rem(16) }} />

  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(_value: string | null, option: ComboboxItem) {
    if (_value === null) return;

    const newPathname = pathname.replace(`/${locale}`, "")

    // @ts-ignore
    router.replace(`${_value}${newPathname}`);
  }

  return (
    <div>
      <h1>{t("title")}</h1>

      <Select
        label="Select Langauge"
        w={200}
        checkIconPosition="right"

        leftSectionPointerEvents="none"
        leftSection={ icon }

        defaultValue={locale}
        data={locales}
        onChange={onSelectChange}
      />
    </div>
  );
}