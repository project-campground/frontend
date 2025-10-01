import { styled, Tooltip, Typography } from "@mui/joy";
import ms from "ms";

type Props = {
    date: Date;
    noAgo?: boolean;
    displayDate?: boolean;
};

const DateTooltip = styled(Tooltip, {
    slot: "tooltip",
})((theme) => ({

}));
const DatestampText = styled(Typography, {
    slot: "text",
})((theme) => ({

}));

export default function Datestamp({ noAgo, displayDate, date }: Props) {
    const time = `${ms(Date.now() - date.getTime(), { long: true })} ${noAgo ? "" : "ago"}`;
    const dateFormat = date.toLocaleDateString("en-US");

    return (
        <DateTooltip title={displayDate ? time : dateFormat}>
            <DatestampText>
                {displayDate ? dateFormat : time}
            </DatestampText>
        </DateTooltip>
    );
}