import { useState } from 'react';
import { Tooltip, UnstyledButton, Image, Divider, rem } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import classes from './sidebar.module.scss';
interface IProps {
	img?: string;
	icon?: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick: any;
	index: number;
};

interface IState {
	radius: number;
};

function NullOrUndef(data:any) { return (data === null || data === undefined || typeof data === 'undefined'); }
function OnHover(setHovered:any) { setHovered(true); }
function OnLeave(setHovered:any) { setHovered(false); }

export default function SidebarImage({ img, icon: Icon, label, active, onClick, index }: IProps, { radius }: IState) {
	const [hovered, setHovered] = useState(false);
	radius = (active || hovered) ? 15 : 30;

	let isIco = !NullOrUndef(Icon);
	
	let pxsz = 50;

	return (
		<div>
			<Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
					<UnstyledButton
						onClick={onClick}
						className={classes.link}
						data-active={active}
						style={{
							width: rem(pxsz),
							height: rem(pxsz),
							padding: (isIco ? rem(pxsz / 4) : 0),
							background: (isIco ? 'rgb(75, 75, 75)' : 'transparent'),
							borderRadius: (isIco ? radius : 0),
							transitionDuration: '0.15s',
						}}
						onMouseEnter={() => OnHover(setHovered)}
						onMouseLeave={() => OnLeave(setHovered)}
					>
						{isIco && Icon !== undefined && (
							<Icon style={{ width: rem(pxsz / 2), height: rem(pxsz / 2) }} stroke={1.5} />
						)}
						{!NullOrUndef(img) && (
							<Image
								radius={radius}
								src={img}
								alt={label}
							/>
						)}
					</UnstyledButton>
			</Tooltip>
			{index === 0 && (
				<Divider
					my={"md"}
				/>
			)}
		</div>
	);
}