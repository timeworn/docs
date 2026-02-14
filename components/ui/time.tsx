import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface TimeProps {
  date: string | Date;
  format?: "date" | "timeago";
  className?: string;
  tooltip?: boolean;
}

export const Time: React.FC<TimeProps> = ({
  date,
  format,
  className,
  tooltip,
}) => {
  const d = dayjs(date);
  if (!d.isValid()) {
    return <time className={className}>Invalid date</time>;
  }

  const formattedDate = d.toISOString();
  const formattedFullDate = d.format("LLLL");
  let display;

  if (format === "date") {
    display = d.format("ll");
  } else if (format === "timeago") {
    display = d.fromNow();
  } else {
    const now = dayjs();
    const diffDays = now.diff(d, "day");
    if (diffDays <= 2) {
      display = d.fromNow();
    } else {
      display = d.format("ll");
    }
  }
  return (
    <>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <time
              className={className}
              dateTime={formattedDate}
              aria-label={display}
            >
              {display}
            </time>
          </TooltipTrigger>
          <TooltipContent>{formattedFullDate}</TooltipContent>
        </Tooltip>
      ) : (
        <time
          className={className}
          title={formattedFullDate}
          dateTime={formattedDate}
          aria-label={display}
        >
          {display}
        </time>
      )}
    </>
  );
};
