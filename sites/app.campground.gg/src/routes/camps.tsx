import type { Route } from "./+types/camps";
import { Stack, Typography } from "@mui/joy";
import { Outlet } from "react-router";

export function meta(routes: Route.MetaArgs) {
    console.log("camps", routes);

    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index(...args: unknown[]) {
    return <Stack>
        <Typography>Layout</Typography>
        <Outlet />
    </Stack>;
}