import { Button, List, Stack, styled, type ColorPaletteProp } from "@mui/joy";
import React from "react";
import ContentCategory from "../content/ContentCategory";

export interface PageSidebarSection {
    id: string;
    header: React.ReactNode | React.ReactNode[];
    items: PageSidebarItem[];
};
export interface PageSidebarItem {
    id: string;
    name: React.ReactNode | React.ReactNode[];
    startDecorator?: React.ReactNode | React.ReactNode[];
    endDecorator?: React.ReactNode | React.ReactNode[];
    color?: ColorPaletteProp;
};
type Props = {
    defaultActive: string;
    sections: PageSidebarSection[];
    onClick: (id: string) => unknown;
};
type State = {
    activeId: string;
};

export default class PageSidebar extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = { activeId: this.props.defaultActive };
    }
    onClick(id: string) {
        this.setState({ activeId: id });
        this.props.onClick(id);
    }
    render(): React.ReactNode {
        const onClick = this.onClick.bind(this);
        return (
            <Stack gap={2}>
                {this.props.sections.map((x) =>
                    <PageSidebarSectionComponent key={x.id} activeItem={this.state.activeId} {...x} onClick={onClick} />
                )}
            </Stack>
        );
    }
}

function PageSidebarSectionComponent(props: PageSidebarSection & { activeItem: string; onClick: (id: string) => unknown }) {
    return (
        <ContentCategory header={props.header}>
            <List>
                {props.items.map((x) =>
                    <PageSidebarItemComponent key={x.id} active={x.id === props.activeItem} {...x} onClick={() => props.onClick(x.id)} />
                )}
            </List>
        </ContentCategory>
    )
}

const PageSidebarItemButton = styled(Button, {
    name: "PageSidebarItem",
    slot: "root",
})(({ theme }) => ({
    justifyContent: "start",
    border: `solid 1px transparent`,
    transitionProperty: "background, color, box-shadow, border",
    "&.active": {
        border: `solid 1px ${theme.vars.palette.neutral.border}`,
        boxShadow: theme.vars.shadow.sm,
    },
    "&.MuiButton-colorDanger.active": {
        border: `solid 1px ${theme.vars.palette.danger.border}`,
    },
}));

function PageSidebarItemComponent(props: PageSidebarItem & { active: boolean; onClick: () => unknown }) {
    return (
        <PageSidebarItemButton onClick={props.onClick} className={props.active ? "active" : ""} variant={props.active ? "soft" : "plain"} color={props.color ?? "neutral"} startDecorator={props.startDecorator} endDecorator={props.endDecorator}>
            {props.name}
        </PageSidebarItemButton>
    )
}