"use client";

import HomePage from "@/components/pages/home";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function Home() {
  const translate = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  
  return (
    <HomePage
      translate={translate}
      pathname={pathname}
      locale={locale}
    />
  );
};