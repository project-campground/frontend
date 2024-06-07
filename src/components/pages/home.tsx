import { ComboboxItem, Select, rem } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
import locales from "../../supportedLocales.json";

class HomePage extends React.Component<any, { mounted: boolean }> {
    constructor(props: any) {
        super(props);
    };

    render() {
        const translate = useTranslations("Home");
        const pathname = usePathname();
        const locale = useLocale();

        function onSelectChange(_value: string | null, option: ComboboxItem) {
            if (_value === null) return;
        
            const newPathname = pathname.replace(`/${locale}`, "")
        
            // @ts-ignore
            router.replace(`${_value}${newPathname}`);
        };

        const icon = <IconLanguage style={{ width: rem(16), height: rem(16) }} />
        return (
            <div>
                <h1>{translate("title")}</h1>
                <Select
                    label="Select Langauge"
                    w={200}
                    checkIconPosition="right"

                    leftSectionPointerEvents="none"
                    leftSection={icon}

                    defaultValue={locale}
                    data={locales}
                    onChange={onSelectChange}
                />
            </div>
        );
    };
};

export default HomePage;