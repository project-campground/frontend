import { FormattedMessage, useIntl } from "react-intl";
import type { RolePageTabProps } from ".";
import type { RoleMotion } from "types/roles";
import {
    IconAccessPoint,
    IconAt,
    IconRipple,
    IconSeparatorHorizontal,
    IconWaveSine,
    IconX,
} from "@tabler/icons-react";
import FormSection from "~/components/form/FormSection";
import { FormContext } from "~/components/form/context";
import TentMessage from "~/components/tents/TentMessage";
import { Card, FormControl, FormLabel, Stack } from "@mui/joy";
import { Group } from "components";
import FormFieldText from "~/components/form/FormFieldText";
import FormFieldArray from "~/components/form/FormFieldArray";
import FormFieldColor from "~/components/form/FormFieldColor";
import FormFieldRadio from "~/components/form/FormFieldRadio";
import FormFieldRadioGridOption from "~/components/form/FormFieldRadioGridOption";
import FormFieldSwitch from "~/components/form/FormFieldSwitch";
import GridList from "~/components/content/GridList";

export default function RolePageDisplay({
    role,
    defaultValues,
}: RolePageTabProps) {
    const intl = useIntl();

    const fakeMessage = {
        id: "",
        campsiteId: "",
        bonfireId: "",
        tentId: "",
        replyingTo: [],
        replyingToCount: 0,
        content: intl.formatMessage({
            id: "app.messages.example",
            defaultMessage: "This is an example text.",
            description: "An example message text in roles settings page",
        }),
        createdAt: new Date().toISOString(),
        createdBy: {
            isMember: true,
            nickname: null,
            user: {
                did: "",
                displayName: intl.formatMessage({
                    id: "app.actors.example",
                    defaultMessage: "Example user",
                    description:
                        "Username of an example user in roles settings page",
                }),
                handle: "",
                description: "",
                tagline: "",
                location: "",
                avatar: null,
                banner: null,
                createdAt: new Date().toISOString(),
            },
            roles: [role.id],
        },
    };

    return (
        <Stack gap={2}>
            <FormSection>
                <FormContext.Consumer>
                    {(values) => {
                        const colorRole = { ...role, ...values };
                        return (
                            <Group
                                withMobile
                                gap={2}
                                sx={{
                                    flexDirection: { xs: "column", lg: "row" },
                                }}
                            >
                                <Card
                                    data-joy-color-scheme="dark"
                                    sx={{ px: 1, py: 1, flex: 1 }}
                                >
                                    <TentMessage
                                        hideToolbar
                                        unhoverable
                                        onDelete={() => null}
                                        addReply={() => null}
                                        colorRoles={[colorRole]}
                                        message={fakeMessage}
                                    />
                                </Card>
                                <Card
                                    data-joy-color-scheme="light"
                                    sx={{ px: 1, py: 1, flex: 1 }}
                                >
                                    <TentMessage
                                        hideToolbar
                                        unhoverable
                                        onDelete={() => null}
                                        addReply={() => null}
                                        colorRoles={[colorRole]}
                                        message={fakeMessage}
                                    />
                                </Card>
                            </Group>
                        );
                    }}
                </FormContext.Consumer>
            </FormSection>
            <FormSection>
                <FormControl>
                    <FormLabel>
                        <FormattedMessage
                            id="app.roles.name"
                            defaultMessage="Role name"
                            description="The name field of the roles settings page"
                        />
                    </FormLabel>
                    <FormFieldText
                        required
                        id="name"
                        defaultValue={defaultValues.name}
                    />
                </FormControl>
            </FormSection>
            <FormSection>
                <FormControl>
                    <FormLabel>
                        <FormattedMessage
                            id="app.roles.colors"
                            defaultMessage="Role colors"
                            description="The colors field of the roles settings page"
                        />
                    </FormLabel>
                    <FormFieldArray
                        id="colors"
                        defaultValue={defaultValues.colors}
                        max={5}
                        FieldComponent={FormFieldColor}
                        fieldProps={{
                            defaultValue: 0,
                            required: true,
                            allowAlpha: true,
                        }}
                    />
                </FormControl>
            </FormSection>
            <FormSection>
                <FormControl>
                    <FormLabel>
                        <FormattedMessage
                            id="app.roles.colors"
                            defaultMessage="Select the type of gradient color animation"
                            description="The animation field in role settings page"
                        />
                    </FormLabel>
                    <FormFieldRadio
                        required
                        id="motion"
                        defaultValue={defaultValues.motion}
                    >
                        <GridList>
                            <FormFieldRadioGridOption
                                startDecorator={<IconX />}
                                value={"none" satisfies RoleMotion}
                            >
                                <FormattedMessage
                                    id="app.roles.motion.none"
                                    defaultMessage="Unanimated"
                                    description="Unanimated option for roles gradient color animation"
                                />
                            </FormFieldRadioGridOption>
                            <FormFieldRadioGridOption
                                startDecorator={<IconRipple />}
                                value={"linear" satisfies RoleMotion}
                            >
                                <FormattedMessage
                                    id="app.roles.motion.linear"
                                    defaultMessage="Linear"
                                    description="Linear animation option for roles gradient color animation"
                                />
                            </FormFieldRadioGridOption>
                            <FormFieldRadioGridOption
                                startDecorator={<IconWaveSine />}
                                value={"wave" satisfies RoleMotion}
                            >
                                <FormattedMessage
                                    id="app.roles.motion.wave"
                                    defaultMessage="Wave"
                                    description="Wave animation option for roles gradient color animation"
                                />
                            </FormFieldRadioGridOption>
                            <FormFieldRadioGridOption
                                startDecorator={<IconAccessPoint />}
                                value={"radial" satisfies RoleMotion}
                            >
                                <FormattedMessage
                                    id="app.roles.motion.radial"
                                    defaultMessage="Radial"
                                    description="Radial animation option for roles gradient color animation"
                                />
                            </FormFieldRadioGridOption>
                        </GridList>
                    </FormFieldRadio>
                </FormControl>
            </FormSection>
            <FormSection
                layout="divided"
                header={
                    <FormattedMessage
                        id="app.roles.attributes"
                        defaultMessage="Attributes"
                        description="Attributes in role settings"
                    />
                }
            >
                <FormControl>
                    <FormFieldSwitch
                        required
                        id="raised"
                        defaultValue={defaultValues.raised}
                        label={
                            <FormattedMessage
                                id="app.roles.separately"
                                defaultMessage="Display separately"
                                description="Display separately setting in role settings"
                            />
                        }
                        startDecorator={<IconSeparatorHorizontal />}
                        description={
                            <FormattedMessage
                                id="app.roles.separately.desc"
                                defaultMessage="Displays the members that have this role separately from the rest of the members in the member list"
                                description="Display separately setting's description in role settings"
                            />
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormFieldSwitch
                        required
                        id="pingable"
                        label={
                            <FormattedMessage
                                id="app.roles.mentionable"
                                defaultMessage="Mentionable by anyone"
                                description="Mentionable by anyone setting in role settings"
                            />
                        }
                        startDecorator={<IconAt />}
                        description={
                            <FormattedMessage
                                id="app.roles.mentionable.desc"
                                defaultMessage="Allows any member with permission to create content to mention other members that have this role"
                                description="Mentionable by anyone setting's description in role settings"
                            />
                        }
                        defaultValue={defaultValues.pingable}
                    />
                </FormControl>
            </FormSection>
        </Stack>
    );
}
