"use client";

import { useState } from 'react';
import {
  HoverCard,
  Group,
  Button,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
  ActionIcon,
  useMantineColorScheme,
  ColorSchemeScript,
  MantineProvider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from "./navbar.module.scss";
import Lang from './language';
import locales from '../../supportedLocales.json';

const Navbar = (props: any) => {
    const { translate, pathname, locale } = props.commonProps;
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { setColorScheme } = useMantineColorScheme();

    const logo = "/logo.svg";

    const themeProps = {
        variant: "default",
        size: "md",
        'aria-label': translate("globalNav.themeToggle"),
    };
    
    return (
        <Box pb={120}>
            <ColorSchemeScript defaultColorScheme="dark" />
            <MantineProvider defaultColorScheme="dark">
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

                        <ActionIcon onClick={() => setColorScheme('light')} {...themeProps} lightHidden>
                            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon onClick={() => setColorScheme('dark')} {...themeProps} darkHidden>
                            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                        </ActionIcon>

                        <Lang data={locales} defaultValue={locale} pathname={pathname} translate={translate} />

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
            </MantineProvider>
            
        </Box>
    );
};

export default Navbar;
