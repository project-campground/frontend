import { Avatar, Card, CardContent, List, ListItem, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { IconConfettiFilled } from "@tabler/icons-react";

type Props = {
};

export default function HomeActivity(props: Props) {
    return (
        <Card variant="outlined" sx={(theme) => ({ width: "100%", backgroundColor: theme.vars.palette.background.body })}>
            <CardContent>
                <Typography level="title-md" fontWeight={900} textColor="text.tertiary" sx={{ mb: 1 }}>Recent activity</Typography>
                <List>
                    <ListItem>
                        <ListItemDecorator sx={{ mr: 0.5 }}>
                            <Avatar variant="soft">
                                <IconConfettiFilled />
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="title-md" fontWeight={900}>Welcome to Campground!</Typography>
                            <Typography level="body-md">Look around and discover camps, campers and more!</Typography>
                        </ListItemContent>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}