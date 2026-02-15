import { Alert, DialogContent, DialogTitle, ModalDialog } from "@mui/joy";
import type { RestResponseError } from "api/RESTResponse";
import { useState } from "react";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";

type Props = {
    campsiteId: string;
    lowestPriorityBonfire: number;
    onClose: () => Promise<void> | void;
};

export default function BonfireCreationModal({ campsiteId, onClose, lowestPriorityBonfire }: Props) {
    const session = useSession();
    const [error, setError] = useState<RestResponseError | null>(null);

    const onBonfireCreate = (body: Record<string, any>): unknown =>
        session.restClient
            ?.createBonfire(campsiteId, { ...body, priority: lowestPriorityBonfire + 1 } as { name: string; description: string; priority: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return onClose();
            });

    return (
        <ModalDialog>
            <DialogTitle>Create bonfire</DialogTitle>
            <DialogContent>Create a new bonfire in this campsite</DialogContent>
            <Form
                sections={[
                    {
                        id: "info",
                        fields: [
                            {
                                id: "name",
                                type: "text",
                                header: "Bonfire name",
                                required: true,
                            },
                            {
                                id: "description",
                                type: "text",
                                header: "Bonfire description",
                                defaultValue: "",
                            },
                        ]
                    },
                ]}
                onSubmit={(_, values) => onBonfireCreate(values)}
                submitText="Create"
            >
                {error && <Alert color="danger" variant="soft">{error.status} {error.errorHeader}: {error.errorDescription}</Alert>}
            </Form>
        </ModalDialog>
    )
}