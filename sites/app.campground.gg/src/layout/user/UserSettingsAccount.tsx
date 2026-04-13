import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../settings";
import React, { type ContextType } from "react";
import SettingsPageWrapper from "../settings/page";
import { IconUserFilled } from "@tabler/icons-react";
import { AccountContext } from "~/context/session";

type DefaultValues = {
    
};
type State = {
    
};

export default class UserSettingsAccount extends React.Component<SettingsComponentProps<{}>, State> {
    static contextType?: React.Context<any> | undefined = AccountContext;
    declare context: ContextType<typeof AccountContext>;
    private _defaultValues: DefaultValues;
    private _init: boolean = false;

    constructor(props: SettingsComponentProps<{}>, context: ContextType<typeof AccountContext>) {
        super(props, context);

        this._defaultValues = {
            
        };
    }
    oneOfNotDefault(fieldValues: Record<string, any>) {
        return Object.entries(fieldValues).some(
            ([key, value]) =>
                this._defaultValues[key as keyof typeof this._defaultValues] != value,
        );
    }
    componentDidMount(): void {
        if (this._init)
            return;

        this._init = true;
    }
    render() {
        return (
            <SettingsPageWrapper
                startDecorator={<IconUserFilled />}
                header={this.context?.me.profile.displayName}
            >
                <Box sx={{ width: 500 }}>
                    <Form
                        ref={(form) =>
                            (form as Form | undefined) &&
                            this.props.setResetHandler(form!.reset)
                        }
                        onChange={(isValid, values) =>
                            this.props.onValuesChanged(
                                isValid,
                                this.oneOfNotDefault(values),
                                values,
                            )
                        }
                    >
                        TODO
                    </Form>
                </Box>
            </SettingsPageWrapper>
        );
    }
}

// export default function UserSettingsAccount({
//     setResetHandler,
//     onValuesChanged,
// }: SettingsComponentProps<{ me: Me }>) {
//     const me = useMeContext();
//     const defaultValues = useMemo(
//         () => ({
//         }),
//         [],
//     );

// }
