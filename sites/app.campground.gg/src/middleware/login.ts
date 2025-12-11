import { redirect } from "react-router";

export function loginPageRejectionMiddleware() {
    const auth = window.localStorage.getItem("auth");

    try {
        if (auth) {
            const json = JSON.parse(auth);
            // No reason to be here
            if (json.authenticated)
                throw redirect("/");
        }
    } catch(err) {
        if (err instanceof SyntaxError)
            return;
        else throw err;
    }
}

export function loginRequiredMiddleware() {
    const auth = window.localStorage.getItem("auth");

    try {
        if (auth) {
            const json = JSON.parse(auth);
            // No reason to be here
            if (!json.authenticated)
                throw redirect("/login");
        }
    } catch(err) {
        if (err instanceof SyntaxError)
            throw redirect("/login");
        else throw err;
    }
}