import { Alert, Card, DialogContent, DialogTitle, ModalDialog, Sheet, Stack, Typography } from "@mui/joy";
import { IconCategory, IconHash, IconTent } from "@tabler/icons-react";
import type { HttpResponseError } from "api/HTTPResponse";
import { useState } from "react";
import type { TentCategoryView, TentViewDetailed } from "types/tent";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import { PseudoTentItem } from "./TentItem";
import { TentStyledList } from "./TentList";
import ContentCategory from "~/components/content/ContentCategory";

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
            .create(campsiteId, bonfireId, { ...body, categoryId: categoryId ?? undefined, priority: lowestPriorityTent + 1 } as { categoryId?: number; name: string; type: number; description: string; priority: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });
    const onCategoryCreate = (name: string, description: string): unknown =>
        session.http
            .categories
            .create(campsiteId, bonfireId, { name, description, priority: lowestPriorityCategory + 1 } as { name: string; description: string; priority: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });

    return (
        <ModalDialog>
            <DialogTitle>Create tent</DialogTitle>
            <DialogContent>Create a new tent or tent category in this bonfire</DialogContent>
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
                                <TentStyledList>
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
                                </TentStyledList>
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
                                header: "Select what to create",
                                required: true,
                                defaultValue: "tent",
                                design: "grid",
                                options: [
                                    {
                                        value: "tent",
                                        text: "Tent",
                                        startDecorator: <IconTent />
                                    },
                                    {
                                        value: "category",
                                        text: "Category",
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
                                header: "Name",
                                required: true,
                            },
                            {
                                id: "description",
                                type: "textarea",
                                header: "Topic",
                                defaultValue: "",
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
                                header: "Select the type of tent",
                                required: true,
                                defaultValue: 0,
                                design: "grid",
                                options: [
                                    {
                                        value: 0,
                                        text: "Text",
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