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
  useMantineColorScheme, useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';
import {
  IconChevronDown,
  IconSun, IconMoon,
} from '@tabler/icons-react';
import classes from "./navbar.module.css";

const Navbar = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                <Group h="100%" gap={0} visibleFrom="sm">
                    <a style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Image
                            src={computedColorScheme === "dark" ? "/campground-logo.svg" : "/logo.svg"}
                            h={48}
                            w={48}
                        />
                    </a>
                    <a href="#" className={classes.link}>
                    Download
                    </a>
                    <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>

                    </HoverCard>
                    <a href="#" className={classes.link}>
                    Blog
                    </a>
                    <a href="#" className={classes.link}>
                    Support
                    </a>
                </Group>
                <Group visibleFrom="sm" gap={12}>
                    <Button variant="default">Log in</Button>
                    <Button>Sign up</Button>
                    <ActionIcon
                        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        variant="default"
                        size="md"
                        aria-label="Toggle color scheme"
                    >
                        {computedColorScheme === "light" ? (
                            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                        ) : (
                            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                        )}
                    </ActionIcon>
                </Group>

                <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <Image
            src={"/campground-logo.svg"}
            h={48}
            w={48}
        />
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                <Divider my="sm" />

                <a href="#" className={classes.link}>
                    Download
                </a>
                <a href="#" className={classes.link}>
                    Blog
                </a>
                <a href="#" className={classes.link}>
                    Support
                </a>

                <Divider my="sm" />

                <Group justify="center" grow pb="xl" px="md">
                    <Button variant="default">Login</Button>
                    <Button>Sign up</Button>
                </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
};

export default Navbar;