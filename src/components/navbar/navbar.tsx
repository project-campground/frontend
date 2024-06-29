"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Image,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';
import { IconChevronDown, IconSun, IconMoon } from '@tabler/icons-react';
import classes from "./navbar.module.scss";

const Navbar = (props: any) => {
    const { translate, pathname, locale } = props.commonProps;
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const isLight = (computedColorScheme === 'light');

    const logo = "/logo.svg";
    
    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                <Group h="100%" gap={0} visibleFrom="sm">
                    <a style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Image src={logo} h={48} w={48} alt={"Campground"} />
                    </a>
                    <a href="#" className={classes.link}>{translate("globalNav.download")}</a>
                    <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>

                    </HoverCard>
                    <a href="#" className={classes.link}>{translate("globalNav.blog")}</a>
                    <a href="#" className={classes.link}>{translate("globalNav.support")}</a>
                </Group>
                <Group visibleFrom="sm" gap={12}>
                    <Button variant="default">{translate("globalNav.login")}</Button>
                    <Button>{translate("globalNav.register")}</Button>
                    <ActionIcon
                        onClick={() => setColorScheme(isLight ? 'dark' : 'light')}
                        variant="default"
                        size="md"
                        aria-label="Toggle color scheme"
                    >
                        {isLight
                            ? <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                            : <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                        }
                    </ActionIcon>
                </Group>

                <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" hiddenFrom="sm" zIndex={1000000}>
                <Image src={logo} h={48} w={48} alt="Campground" />
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                <Divider my="sm" />

                <a href="#" className={classes.link}>{translate("globalNav.download")}</a>
                <a href="#" className={classes.link}>{translate("globalNav.blog")}</a>
                <a href="#" className={classes.link}>{translate("globalNav.support")}</a>

                <Divider my="sm" />

                <Group justify="center" grow pb="xl" px="md">
                    <Button variant="default">{translate("globalNav.login")}</Button>
                    <Button>{translate("globalNav.register")}</Button>
                </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
};

export default Navbar;