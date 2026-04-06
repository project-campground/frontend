import { FormattedMessage } from "react-intl";
import globalIntlDeclarations from "./declarations";

type Props<T extends keyof typeof globalIntlDeclarations> = {
    id: T;
    values?: (typeof globalIntlDeclarations)[T] extends { values: infer V }
        ? V extends Record<string, any>
            ? V
            : never
        : never;
};

export default function FormattedMessageGlobal<
    T extends keyof typeof globalIntlDeclarations,
>({ id, values }: Props<T>) {
    return <FormattedMessage {...globalIntlDeclarations[id]} values={values} />;
}
