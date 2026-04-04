import { Alert, Card, DialogContent, DialogTitle, ModalClose, ModalDialog, Sheet, Stack, Typography } from "@mui/joy";
import { IconCategory, IconHash, IconTent } from "@tabler/icons-react";
import type { HttpResponseError } from "~/api/HTTPResponse";
import { useState } from "react";
import type { TentCategoryView, TentViewDetailed } from "types/tent";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import ContentCategory from "~/components/content/ContentCategory";
import TentList from "~/components/tents/TentList";
import { PseudoTentItem } from "~/components/tents/TentItem";
import { FormattedMessageGlobal } from "~/i18n";
import { FormattedMessage } from "react-intl";

type Props = {
    campsiteId: string;
    bonfireId: string;
    categoryId: string | null;
    categories: TentCategoryView[];
    lowestPriorityTent: number;
    lowestPriorityCategory: number;
    onClose: () => Promise<void> | void;
    onTentCreated: (tent: TentViewDetailed) => void | unknown;
};

export default function TentCreationModal({ campsiteId, bonfireId, categoryId, onClose, lowestPriorityTent, lowestPriorityCategory }: Props) {
    const session = useSession();
    const [error, setError] = useState<HttpResponseError | null>(null);

    const onTentCreate = (body: Record<string, any>): unknown =>
        session.http
            .tents
            .create(campsiteId, bonfireId, { ...body, categoryId: categoryId ?? undefined, position: lowestPriorityTent + 1 } as { categoryId?: number; name: string; type: number; description: string; position: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });
    const onCategoryCreate = (name: string, description: string): unknown =>
        session.http
            .categories
            .create(campsiteId, bonfireId, { name, description, position: lowestPriorityCategory + 1 } as { name: string; description: string; position: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessageGlobal id="app.tents.create" />
            </DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="app.tents.create.description"
                    defaultMessage="Create a new tent or tent category in this bonfire"
                    description="Tent creation modal description"
                />
            </DialogContent>
            <Form
                inlineReactiveComponent
                ReactiveComponent={({ what, name, description }) =>
                    <Sheet sx={{ bgcolor: "background.body", borderRadius: "md", p: 2 }}>
                        <Card variant="outlined" sx={{ width: 300 }}>
                            <ContentCategory header={
                                <Stack flex={1}>
                                    <Typography level="title-md">{what === "category" ? name : "Example category"}</Typography>
                                    {description && <Typography level="body-sm">{what === "category" ? description : "Example description"}</Typography>}
                                </Stack>
                            }>
                                <TentList>
                                    <PseudoTentItem tent={{
                                        name: "Example tent #1",
                                        type: "text",
                                        viewType: 0,
                                    }} />
                                    <PseudoTentItem isActive={what === "tent"} tent={{
                                        name: what === "tent" ? name : "Example tent #2",
                                        type: "text",
                                        viewType: 0,
                                    }} />
                                    <PseudoTentItem tent={{
                                        name: "Example tent #3",
                                        type: "text",
                                        viewType: 0,
                                    }} />
                                </TentList>
                            </ContentCategory>
                        </Card>
                    </Sheet>
                }
                sections={[
                    {
                        id: "type",
                        fields: [
                            {
                                id: "what",
                                type: "radio",
                                header: <FormattedMessage
                                    id="app.tents.create.what"
                                    defaultMessage="What to create"
                                    description="What to create: tent or tent category"
                                />,
                                required: true,
                                defaultValue: "tent",
                                design: "grid",
                                options: [
                                    {
                                        value: "tent",
                                        text: <FormattedMessage
                                            id="app.tents.singular"
                                            defaultMessage="Tent"
                                            description="Tent in singular form for tent creation modal"
                                        />,
                                        startDecorator: <IconTent />
                                    },
                                    {
                                        value: "category",
                                        text: <FormattedMessage
                                            id="app.tentCategories.singular"
                                            defaultMessage="Category"
                                            description="Tent category in singular form for tent creation modal"
                                        />,
                                        startDecorator: <IconCategory />
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        id: "info",
                        fields: [
                            {
                                id: "name",
                                type: "text",
                                header: <FormattedMessageGlobal id="info.name" />,
                                required: true,
                                max: 48,
                                min: 3,
                            },
                            {
                                id: "description",
                                type: "textarea",
                                header: <FormattedMessageGlobal id="info.description" />,
                                defaultValue: "",
                                max: 200,
                            },
                        ]
                    },
                    {
                        id: "tent",
                        header: "Tent settings",
                        disableOn: ({ what }) => what !== "tent",
                        fields: [
                            {
                                id: "type",
                                type: "radio",
                                header: <FormattedMessage
                                    id="app.tents.create.type"
                                    defaultMessage="Select the type of tent's content"
                                    description="Header for tent type selection"
                                />,
                                required: true,
                                defaultValue: 0,
                                design: "grid",
                                options: [
                                    {
                                        value: 0,
                                        text: <FormattedMessageGlobal id="app.tents.text" />,
                                        startDecorator: <IconHash />
                                    },
                                ]
                            },
                        ]
                    }
                ]}
                onSubmit={(_, { what, ...values }) => what === "category" ? onCategoryCreate(values.name, values.description) : onTentCreate(values)}
                submitText="Create"
            >
                {error && <Alert color="danger" variant="soft">{error.status} {error.errorHeader}: {error.errorDescription}</Alert>}
            </Form>
        </ModalDialog>
    )
}