import React, { PropsWithChildren } from "react";
import HTTPError from "~/util/HTTPError";
import PagePlaceholder, { PagePlaceholderIcon } from "./pages/PagePlaceholder";
import { Typography } from "@mui/joy";

interface ErrorBoundaryError {
    message: string;
    header: string;
    status: number | null;
}
type State = {
    error: ErrorBoundaryError | null;
};

export default class ErrorBoundary extends React.Component<PropsWithChildren, State> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = { error: null };
    }
    componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
        return this.setState(ErrorBoundary.getDerivedStateFromError(error));
    }
    render() {
        const { error } = this.state;

        if (error)
            return (
                <PagePlaceholder icon={PagePlaceholderIcon.Error} title={
                    <span>
                        {error.status ? <Typography textColor="text.tertiary" sx={{ mr: 1.5 }}>{error.status}</Typography> : null}
                        <span>{error.header}</span>
                    </span>
                }>
                    {error.message}
                </PagePlaceholder>
            );

        const { children } = this.props;

        const Renderer = () => {
            return children;
        }

        try {
            return (
                <Renderer />
            );
        } catch(e) {
            console.error("Error not caught by error boundary", e);
        }
    }
    static getDerivedStateFromError(error: Error): { error: ErrorBoundaryError } {
        if (error instanceof HTTPError)
            return {
                error: {
                    message: error.message,
                    header: error.header,
                    status: error.status,
                }
            };

        return {
            error: {
                message: error.message,
                header: error.name,
                status: null,
            }
        };
    }
}