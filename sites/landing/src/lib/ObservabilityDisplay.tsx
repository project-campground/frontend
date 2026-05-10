import { keyframes } from "@emotion/react";
import { Box } from "@mui/joy";
import React, { ReactNode } from "react";

type Element = {
    elementId: string;
    node: ReactNode;
};

type Props = {
    threshold?: number;
    observeQuery: string;
    children: Element[]  | Element;
};
type State = {
    displayIds: string[];
};

export default class ObservabilityDisplay extends React.Component<Props, State> {
    intersectionObserver?: IntersectionObserver;
    items: Element[];

    static appearAnimation = keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 100%;
        }
    `;

    constructor(props: Props) {
        super(props);

        this.state = { displayIds: [] };
        this.items = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    }

    callback(entries: IntersectionObserverEntry[], _: IntersectionObserver) {
        console.log(entries.map((x) => ({ targetId: x.target.id, isIntersecting: x.isIntersecting })));
        this.setState({ displayIds: entries.filter(x => x.isIntersecting).map(x => x.target.id) });
    }

    componentDidMount(): void {
        const options = {
            root: null,
            rootMargin: `0px`,
            threshold: this.props.threshold,
        };
        this.intersectionObserver = new IntersectionObserver(this.callback.bind(this), options);

        for (const item of this.items)
            this.intersectionObserver.observe(document.querySelector(`#${item.elementId}`)!);
    }

    componentWillUnmount(): void {
        
    }

    render(): React.ReactNode {
        const { displayIds } = this.state;

        return (
            <Box className="ObservabilityDisplay container" sx={{ position: "relative" }}>
                {this.items.map(({ elementId, node }, i) =>
                    <Box key={i} className="ObservabilityDisplay item" sx={{ position: "absolute", top: 0, left: 0, transition: `opacity 1s`, opacity: Number(displayIds.includes(elementId)) }}>
                        {node}
                    </Box>
                )}
            </Box>
        );
    }
}