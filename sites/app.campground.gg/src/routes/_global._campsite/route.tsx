import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/route";
import CampsiteLayout from "./CampsiteLayout";
import { loginRequiredMiddleware } from "~/middleware/login";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
];

export default function Index({ params: { campId } }: Route.ComponentProps) {
    const navigate = useNavigate();

    return (
        <CampsiteLayout campsiteId={campId} navigate={navigate}>
            <Outlet />
        </CampsiteLayout>
    );
}