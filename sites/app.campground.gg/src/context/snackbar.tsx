import { Alert, IconButton, Snackbar, type ColorPaletteProp } from "@mui/joy";
import { IconX, IconExclamationCircleFilled, IconCircleCheckFilled, IconInfoCircleFilled } from "@tabler/icons-react";
import type { HttpResponse, HttpResponseError } from "~/api/HTTPResponse";
import { Group } from "components";
import React, { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SnackbarProps = {
    color?: ColorPaletteProp;
    text: ReactNode | ReactNode[];
    startDecorator?: ReactNode | ReactNode[];
};

export type SnackbarItem = SnackbarProps & { id: number };

type SnackbarNotify = (text: ReactNode | ReactNode[]) => unknown;
type SnackbarNotifyApi<T extends HttpResponse> = (response: T) => unknown;
export type SnackbarContextType = {
    snackbars: SnackbarItem[];
    notify: (props: SnackbarProps) => unknown;
    notifySuccess: SnackbarNotify;
    notifyInfo: SnackbarNotify;
    notifyWarn: SnackbarNotify;
    notifyError: SnackbarNotify;
    notifyApiError: SnackbarNotifyApi<HttpResponseError>;
};

export const SnackbarContext = createContext<SnackbarContextType>(null!);
export const useSnackbars = () => useContext(SnackbarContext);

export function SnackbarContextProvider({ children }: React.PropsWithChildren) {
    const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

    const notify = (props: SnackbarProps) => setSnackbars([...snackbars, {...props, id: Math.floor(Math.random() * 10000)}]);
    const notifyError: SnackbarNotify = (text) => notify({ color: "danger", startDecorator: <IconExclamationCircleFilled />, text });
    const notifyApiError: SnackbarNotifyApi<HttpResponseError> = (resp: HttpResponseError) => notify({ color: "danger", startDecorator: <IconExclamationCircleFilled />, text: <Group gap={1}><span>{resp.status}</span>{resp.errorHeader && <strong>{resp.errorHeader}:</strong>}<span>{resp.errorDescription}</span></Group> });
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
                        variant="outlined"
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        onClose={close}
                        // color={x.color}
                        startDecorator={
                            <Alert size="sm" color={x.color} variant="soft" sx={{ border: `solid 1px var(--palette-${x.color ?? "neutral"}-border)` }}>
                                {x.startDecorator}
                            </Alert>
                        }
                        endDecorator={<IconButton variant="plain" onClick={close}><IconX size={16} /></IconButton>}
                        autoHideDuration={typeof x.text === "string" ? 500 + (x.text.length * 50) : 4000}
                        sx={{ border: "solid 1px var(--palette-neutral-border)" }}
                    >
                        {x.text}
                    </Snackbar>
                );
            })}
        </SnackbarContext.Provider>
    )
}