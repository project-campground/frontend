import { Tooltip, Typography } from "@mui/joy";
import ms from "ms";

type Props = {
    date: Date;
    long?: boolean;
    noAgo?: boolean;
    displayDate?: boolean;
    dateOptions?: Intl.DateTimeFormatOptions;
};

export const defaultDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};

export default function Datestamp({ dateOptions, noAgo, displayDate, date, long }: Props) {
    const isInvalid = !date || Number.isNaN(date.getSeconds());

    if (isInvalid)
        return (
            <Tooltip title={"The provided date is invalid"}>
                <Typography>
                    Invalid date
                </Typography>
            </Tooltip>
        );

    const time = `${ms(Date.now() - date.getTime(), { long: long ?? false })} ${noAgo ? "" : "ago"}`;
    const dateFormat = date.toLocaleString("en-US", dateOptions ?? defaultDateOptions);

    return (
        <Tooltip title={displayDate ? time : dateFormat}>
            <Typography>
                {displayDate ? dateFormat : time}
            </Typography>
        </Tooltip>
    );
}