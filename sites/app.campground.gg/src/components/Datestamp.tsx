import { styled, Tooltip, Typography } from "@mui/joy";
import ms from "ms";

type Props = {
    date: Date;
    long?: boolean;
    noAgo?: boolean;
    displayDate?: boolean;
};

const DateTooltip = styled(Tooltip, {
    slot: "tooltip",
})();
const DatestampText = styled(Typography, {
    slot: "text",
})();

export default function Datestamp({ noAgo, displayDate, date, long }: Props) {
    const isInvalid = !date || Number.isNaN(date.getSeconds());

    if (isInvalid)
        return (
            <DateTooltip title={"The provided date is invalid"}>
                <DatestampText>
                    Invalid date
                </DatestampText>
            </DateTooltip>
        );

    const time = `${ms(Date.now() - date.getTime(), { long: long ?? false })} ${noAgo ? "" : "ago"}`;
    const dateFormat = date.toLocaleDateString("en-US");

    return (
        <DateTooltip title={displayDate ? time : dateFormat}>
            <DatestampText>
                {displayDate ? dateFormat : time}
            </DatestampText>
        </DateTooltip>
    );
}