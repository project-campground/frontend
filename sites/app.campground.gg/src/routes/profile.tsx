import { Outlet } from "react-router";
import GlobalLayout from "~/layout/GlobalLayout";
import { useSession } from "~/session";

export function meta() {
    return [
        { title: "Campground — Profile" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    const session = useSession();

    return (
        <GlobalLayout page={null} session={session}>
            <Outlet />
        </GlobalLayout>
    );
}