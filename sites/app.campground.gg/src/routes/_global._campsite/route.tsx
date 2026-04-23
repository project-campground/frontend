import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/route";
import CampsiteLayout from "./CampsiteLayout";
import { loginRequiredMiddleware } from "~/middleware/login";
import { defaultBackendDomain } from "api.config";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
];

export default function Index({ params: { campId } }: Route.ComponentProps) {
    const navigate = useNavigate();
    const campIdSplit = campId.split("@");
    const [firstPart, secondPart] = campIdSplit.slice(-2);
    const campsiteId = secondPart || firstPart;
    const backendDomain = secondPart ? firstPart : defaultBackendDomain;

    return (
        <CampsiteLayout campsiteId={campsiteId} backendDomain={backendDomain} navigate={navigate}>
            <Outlet />
        </CampsiteLayout>
    );
}