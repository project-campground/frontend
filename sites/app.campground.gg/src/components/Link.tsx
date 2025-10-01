import { Link as JoyLink, type LinkProps, styled } from "@mui/joy";
import { Link as RouterLink } from "react-router";

const LinkRoot = styled(JoyLink, {
    slot: "root"
})();

const LinkInner = styled(RouterLink, {
    name: "JoyLink"
})(() => ({
    textDecoration: "inherit",
}));

export default function Link({ children, href, ...props }: LinkProps) {
    return (
        <LinkRoot component="span" {...props}>
            <LinkInner to={href ?? "/"}>
                {children}
            </LinkInner>
        </LinkRoot>
    )
}