import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/route";
import CampsiteLayout from "./CampsiteLayout";
import { loginRequiredMiddleware } from "~/middleware/login";
import { defaultBackendDomain } from "api.config";
import { getDomainAndId } from "~/util/domains";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";
import { FormattedMessage } from "react-intl";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
];

export default function Index({ params: { campId } }: Route.ComponentProps) {
    const navigate = useNavigate();
    const campIdSplit = getDomainAndId(campId);

    if (campIdSplit.length > 2)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.NotOk} title={
                <FormattedMessage
                    id="app.campsites.badUrl"
                    defaultMessage="Badly formatted campsite URL"
                    description="The title of the error when there are too many @ symbols in the URL"
                />
            }>
                <FormattedMessage
                    id="app.campsites.badUrl.desc"
                    defaultMessage="Not sure what to do with more than 2 @'s in the URL after /c/."
                    description="The description of the error when  there are too many @ symbols in the URL"
                />
            </PagePlaceholder>
        );

    const [campsiteId, backendDomain] = campIdSplit;

    return (
        <CampsiteLayout campsiteId={campsiteId} backendDomain={backendDomain || defaultBackendDomain} navigate={navigate}>
            <Outlet />
        </CampsiteLayout>
    );
}