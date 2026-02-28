import { Tooltip, Typography } from "@mui/joy";
import ms from "ms";

type DatestampType = "ago" | "before" | "after" | "none";
type Props = {
    date: Date;
    long?: boolean;
    type?: DatestampType;
    prefix?: string;
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

export default function Datestamp({ prefix, dateOptions, type, displayDate, date, long }: Props) {
    const isInvalid = !date || Number.isNaN(date.getSeconds());

    if (isInvalid)
        return (
            <Tooltip title={"The provided date is invalid"}>
                <Typography>
                    Invalid date
                </Typography>
            </Tooltip>
        );

    const timespan = Date.now() - date.getTime();
    // Anything below a minute (seconds ago) should be displayed as "Just now"
    const time = timespan < 60000 ? "Just now" : `${ms(timespan, { long: long ?? false })} ${type !== "none" ? type ?? "ago" : ""}`;
    const dateFormat = date.toLocaleString("en-US", dateOptions ?? defaultDateOptions);

    return (
        <Tooltip title={displayDate ? time : dateFormat} arrow>
            <Typography>
                {prefix}{displayDate ? dateFormat : time}
            </Typography>
        </Tooltip>
    );
}