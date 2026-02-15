import { IconButton, Snackbar, type ColorPaletteProp } from "@mui/joy";
import { IconX, IconExclamationCircleFilled, IconCircleCheckFilled, IconInfoCircleFilled } from "@tabler/icons-react";
import type { RestResponse, RestResponseError } from "api/RESTResponse";
import { Group } from "components";
import React, { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SnackbarProps = {
    color?: ColorPaletteProp;
    text: ReactNode | ReactNode[];
    startDecorator?: ReactNode | ReactNode[];
};

export type SnackbarItem = SnackbarProps & { id: number };

type SnackbarNotify = (text: ReactNode | ReactNode[]) => unknown;
type SnackbarNotifyApi<T extends RestResponse> = (response: T) => unknown;
export type SnackbarContextType = {
    snackbars: SnackbarItem[];
    notify: (props: SnackbarProps) => unknown;
    notifySuccess: SnackbarNotify;
    notifyInfo: SnackbarNotify;
    notifyWarn: SnackbarNotify;
    notifyError: SnackbarNotify;
    notifyApiError: SnackbarNotifyApi<RestResponseError>;
};

export const SnackbarContext = createContext<SnackbarContextType>(null!);
export const useSnackbars = () => useContext(SnackbarContext);

export function SnackbarContextProvider({ children }: React.PropsWithChildren) {
    const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

    const notify = (props: SnackbarProps) => setSnackbars([...snackbars, {...props, id: Math.floor(Math.random() * 10000)}]);
    const notifyError: SnackbarNotify = (text) => notify({ color: "danger", startDecorator: <IconExclamationCircleFilled />, text });
    const notifyApiError: SnackbarNotifyApi<RestResponseError> = (resp: RestResponseError) => notify({ color: "danger", startDecorator: <IconExclamationCircleFilled />, text: <Group><span>{resp.status}{" "}</span>{resp.errorHeader && <strong>{resp.errorHeader}</strong>}<span>:{" "}{resp.errorDescription}</span></Group> });
    const notifySuccess: SnackbarNotify = (text) => notify({ color: "success", startDecorator: <IconCircleCheckFilled />, text});
    const notifyInfo: SnackbarNotify = (text) => notify({ color: "info", startDecorator: <IconInfoCircleFilled />, text});
    const notifyWarn: SnackbarNotify = (text) => notify({ color: "warning", startDecorator: <IconExclamationCircleFilled />, text});
    const removeSnackbar = (snackbar: SnackbarItem) => setSnackbars(snackbars.filter((x) => x !== snackbar));

    const value = useMemo(() => ({
        snackbars,
        notify,
        notifyError,
        notifyApiError,
        notifySuccess,
        notifyInfo,
        notifyWarn,
    }), [snackbars]);

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            {snackbars.map((x) => {
                const close = removeSnackbar.bind(null, x);
                return (
                    <Snackbar
                        open
                        key={x.id}
                        variant="soft"
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        onClose={close} color={x.color}
                        startDecorator={x.startDecorator}
                        endDecorator={<IconButton variant="soft" onClick={close} color={x.color}><IconX size={16} /></IconButton>}
                        autoHideDuration={typeof x.text === "string" ? 500 + (x.text.length * 50) : 4000}
                    >
                        {x.text}
                    </Snackbar>
                );
            })}
        </SnackbarContext.Provider>
    )
}