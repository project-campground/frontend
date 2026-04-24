import { Alert, Card, DialogContent, DialogTitle, ModalClose, ModalDialog, Sheet, Stack, Typography, FormControl, FormLabel, Button } from "@mui/joy";
import { IconCategory, IconHash, IconTent } from "@tabler/icons-react";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { useContext, useState } from "react";
import type { TentCategoryView, TentViewDetailed } from "types/campground/tent";
import Form from "~/components/form/Form";
import { useSession } from "~/context/session";
import ContentCategory from "~/components/content/ContentCategory";
import TentList from "~/components/tents/TentList";
import { PseudoTentItem } from "~/components/tents/TentItem";
import { FormattedMessageGlobal } from "~/i18n";
import { FormattedMessage } from "react-intl";
import { FormContext } from "~/components/form/context";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldRadio from "~/components/form/FormFieldRadio";
import GridList from "~/components/content/GridList";
import FormFieldRadioGridOption from "~/components/form/FormFieldRadioGridOption";
import FormFieldText from "~/components/form/FormFieldText";
import FormFieldTextArea from "~/components/form/FormFieldTextArea";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { useAccount } from "~/context/account";
import { useCampsiteContext } from "~/routes/_global._campsite/context";

type Props = {
    campsiteId: string;
    bonfireId: string;
    categoryId: string | null;
    categories: TentCategoryView[];
    lowestPriorityTent: number;
    lowestPriorityCategory: number;
    onTentCreated: (tent: TentViewDetailed) => void | unknown;
};

export default function TentCreationModal({ campsiteId, bonfireId, categoryId, lowestPriorityTent, lowestPriorityCategory }: Props) {
    const { api } = useCampsiteContext();
    const modalClose = useContext(CloseModalContext);
    const [error, setError] = useState<HttpResponseError | null>(null);

    const onTentCreate = (body: Record<string, any>): unknown =>
        api
            .tents
            .create(campsiteId, bonfireId, { ...body, categoryId: categoryId ?? undefined, position: lowestPriorityTent + 1 } as { categoryId?: number; name: string; type: number; description: string; position: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return modalClose?.({}, "closeClick");
            });
    const onCategoryCreate = (name: string, description: string): unknown =>
        api
            .categories
            .create(campsiteId, bonfireId, { name, description, position: lowestPriorityCategory + 1 } as { name: string; description: string; position: number; })
            .then((r) => {
                if (!r.ok)
                    return setError(r);

                return modalClose?.({}, "closeClick");
            });

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessageGlobal id="app.tents.create" />
            </DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="app.tents.create.desc"
                    defaultMessage="Create a new tent or tent category in this bonfire"
                    description="Tent creation modal description"
                />
            </DialogContent>
            <Form
                inlineContent
                onSubmit={(_, { what, ...values }) => what === "category" ? onCategoryCreate(values.name, values.description) : onTentCreate(values)}
            >
                <FormSection>
                    <FormSection>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessage
                                    id="app.tents.create.what"
                                    defaultMessage="What to create"
                                    description="What to create: tent or tent category"
                                />
                            </FormLabel>
                            <FormFieldRadio required id="what" defaultValue="tent">
                                <GridList>
                                    <FormFieldRadioGridOption
                                        startDecorator={<IconTent />}
                                        value="tent"
                                    >
                                        <FormattedMessage
                                            id="app.tents.singular"
                                            defaultMessage="Tent"
                                            description="Tent in singular form for tent creation modal"
                                        />
                                    </FormFieldRadioGridOption>
                                    <FormFieldRadioGridOption
                                        startDecorator={<IconCategory />}
                                        value="category"
                                    >
                                        <FormattedMessage
                                            id="app.tentCategories.singular"
                                            defaultMessage="Category"
                                            description="Tent category in singular form for tent creation modal"
                                        />
                                    </FormFieldRadioGridOption>
                                </GridList>
                            </FormFieldRadio>
                        </FormControl>
                    </FormSection>
                    <FormSection>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessageGlobal id="info.name" />
                            </FormLabel>
                            <FormFieldText
                                required
                                id="name"
                                max={48}
                                min={3}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessageGlobal id="info.topic" />
                            </FormLabel>
                            <FormFieldTextArea
                                required
                                id="description"
                                defaultValue=""
                                max={200}
                            />
                        </FormControl>
                    </FormSection>
                    <FormContext.Consumer>
                        {({ values: { what } }) =>
                            <FormSection disabled={what === "category"}>
                                <FormControl>
                                    <FormLabel>
                                        <FormattedMessage
                                            id="app.tents.create.type"
                                            defaultMessage="Select the type of tent's content"
                                            description="Header for tent type selection"
                                        />
                                    </FormLabel>
                                    <FormFieldRadio required disabled id="type" defaultValue={0}>
                                        <GridList>
                                            <FormFieldRadioGridOption
                                                disabled={what === "category"}
                                                startDecorator={<IconHash />}
                                                value={0}
                                            >
                                                <FormattedMessageGlobal id="app.tents.text" />
                                            </FormFieldRadioGridOption>
                                        </GridList>
                                    </FormFieldRadio>
                                </FormControl>
                            </FormSection>
                        }
                    </FormContext.Consumer>
                    <FormSection layout="footer">
                        <FormSubmit>
                            <FormattedMessageGlobal id="common.create" />
                        </FormSubmit>
                        <Button color="neutral" variant="plain" onClick={() => modalClose?.({}, "closeClick")}>
                            <FormattedMessageGlobal id="common.cancel" />
                        </Button>
                    </FormSection>
                    <FormSection>
                        {error && <Alert color="danger" variant="soft">{error.status} {error.errorHeader}: {error.errorDescription}</Alert>}
                    </FormSection>
                </FormSection>
                <FormContext.Consumer>
                    {({ values: { description, what, name } }) =>    
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
                </FormContext.Consumer>
            </Form>
        </ModalDialog>
    )
}