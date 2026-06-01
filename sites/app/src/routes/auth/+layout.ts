import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = (ev) => {
    const page = ev.route.id.substring(`/auth/`.length);

    return {
        page,
    };
};