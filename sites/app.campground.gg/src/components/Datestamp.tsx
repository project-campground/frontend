import { Tooltip, styled } from "@mui/joy";
import ms from "ms";
import { FormattedMessage, defineMessage } from "react-intl";

type DatestampType = "ago" | "now" | "in" | "none";
type Props = {
    date: Date | undefined | null;
    long?: boolean;
    when?: boolean;
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

const DatestampRoot = styled("span", {
    name: "Datestamp",
    slot: "root",
})(() => ({
    display: "inline-block",
    verticalAlign: "center",
}));

const datestampFormatByType: Record<DatestampType, ReturnType<typeof defineMessage>> = {
    ago: defineMessage({
        id: "app.time.ago",
        defaultMessage: "{time} ago",
        description: "When something happened 'ago'",
    }),
    now: defineMessage({
        id: "app.time.now",
        defaultMessage: "Just now",
        description: "When something happened just now (less than a minute ago)",
    }),
    in: defineMessage({
        id: "app.time.in",
        defaultMessage: "In {time}",
        description: "When something will happen in specific time",
    }),
    none: defineMessage({
        id: "app.time.none",
        defaultMessage: "{time}",
        description: "Unformatted timestamp",
    }),
};

export default function Datestamp({ prefix, dateOptions, when, displayDate, date, long }: Props) {
    if (!date)
        return (
            <DatestampRoot>
                <FormattedMessage
                    id="app.time.never"
                    defaultMessage="Never"
                    description="The provided date to timestamp component is empty and is usually used to indicate that something never happened"
                />
            </DatestampRoot>
        )

    const isInvalid = !date || Number.isNaN(date.getSeconds());

    if (isInvalid)
        return (
            <DatestampRoot>
                <FormattedMessage
                    id="app.time.invalid"
                    defaultMessage="Invalid date"
                    description="The provided date to timestamp component is invalid in some way"
                />
            </DatestampRoot>
        );

    const timespan = Date.now() - date.getTime();
    const type: DatestampType = when
        ? timespan < -1000
        ? "in"
        : timespan < 60000
        ? "now"
        : "ago"
        : "none";

    // Anything below a minute (seconds ago) should be displayed as "Just now"
    const time = <FormattedMessage
        {...datestampFormatByType[type]}
        values={{ time: ms(timespan, { long: long ?? false }) }}
    />;
    const dateFormat = date.toLocaleString("en-US", dateOptions ?? defaultDateOptions);

    return (
        <Tooltip title={displayDate ? time : dateFormat} arrow>
            <DatestampRoot>
                {prefix}{displayDate ? dateFormat : time}
            </DatestampRoot>
        </Tooltip>
    );
}