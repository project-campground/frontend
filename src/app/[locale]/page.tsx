"use client";

import HomePage from "@/components/_core/home";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import './global.css';

export default function Home() {
  const commonProps = {
    translate: useTranslations(),
    pathname: usePathname(),
    locale: useLocale()
  };
  
  return (
    <HomePage commonProps={commonProps} />
  );
};