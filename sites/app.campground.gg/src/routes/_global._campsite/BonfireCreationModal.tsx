import { Alert, DialogContent, DialogTitle, ModalDialog } from "@mui/joy";
import type { RestResponseError } from "api/RESTResponse";
import { useState } from "react";
import type { BonfireViewDetailed } from "types/campsites";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";

type Props = {
    campsiteId: string;
    lowestPriorityBonfire: number;
    onClose: () => Promise<void> | void;
    onBonfireCreated: (tent: BonfireViewDetailed) => void | unknown;
};

export default function BonfireCreationModal({ campsiteId, onClose, onBonfireCreated, lowestPriorityBonfire }: Props) {
    const session = useSession();
    const [error, setError] = useState<RestResponseError | null>(null);

    const onBonfireCreate = (body: Record<string, any>): unknown =>
        session.restClient
            ?.createBonfire(campsiteId, { ...body, priority: lowestPriorityBonfire + 1 } as { name: string; description: string; priority: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return (onBonfireCreated(r.content), onClose());
            });

    return (
        <ModalDialog>
            <DialogTitle>Create bonfire</DialogTitle>
            <DialogContent>Create a new bonfire in this campsite</DialogContent>
            <Form
                sections={[
                    {
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