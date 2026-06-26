import { Stack } from '@mui/joy';
import React, { createContext, useContext, type PropsWithChildren } from 'react';

export interface PageSidebarContext {
	activeItem: string;
	setActiveItem: (itemId: string) => void;
}
export const PageSidebarContext = createContext<PageSidebarContext>(null!);
export const usePageSidebar = () => useContext(PageSidebarContext);

interface Props extends PropsWithChildren {
	defaultActive: string;
	onItemChange: (id: string) => unknown;
}
type State = { activeId: string };

export default class PageSidebar extends React.Component<Props, State> {
	constructor(props: Props, context: any) {
		super(props, context);
		this.state = { activeId: this.props.defaultActive };
	}
	setActiveItem = (id: string) => {
		if (id === this.state.activeId) return;

		this.setState({ activeId: id });
		this.props.onItemChange(id);
	};
	render(): React.ReactNode {
		return (
			<PageSidebarContext.Provider
				value={{ activeItem: this.state.activeId, setActiveItem: this.setActiveItem }}
			>
				<Stack gap={2}>{this.props.children}</Stack>
			</PageSidebarContext.Provider>
		);
	}
}
