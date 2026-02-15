import { Alert, DialogContent, DialogTitle, ModalDialog } from "@mui/joy";
import { IconCategory, IconHash, IconTent } from "@tabler/icons-react";
import type { RestResponseError } from "api/RESTResponse";
import { useState } from "react";
import type { TentCategoryView, TentViewDetailed } from "types/tent";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";

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
    const [error, setError] = useState<RestResponseError | null>(null);

    const onTentCreate = (body: Record<string, any>): unknown =>
        session.restClient
            ?.createTent(campsiteId, bonfireId, { ...body, categoryId: categoryId ?? undefined, priority: lowestPriorityTent + 1 } as { categoryId?: number; name: string; type: number; description: string; priority: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });
    const onCategoryCreate = (name: string, description: string): unknown =>
        session.restClient
            ?.createCategory(campsiteId, bonfireId, { name, description, priority: lowestPriorityCategory + 1 } as { name: string; description: string; priority: number; })
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
                sections={[
                    {
                        id: "info",
                        fields: [
                            {
                                id: "name",
                                type: "text",
                                header: "Tent name",
                                required: true,
                            },
                            {
                                id: "description",
                                type: "text",
                                header: "Tent description",
                                defaultValue: "",
                            },
                            {
                                id: "what",
                                type: "radio",
                                header: "Select what to create",
                                required: true,
                                defaultValue: "tent",
                                design: "button",
                                options: [
                                    {
                                        value: "category",
                                        text: "Category",
                                        startDecorator: <IconCategory />
                                    },
                                    {
                                        value: "tent",
                                        text: "Tent",
                                        startDecorator: <IconTent />
                                    },
                                ]
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