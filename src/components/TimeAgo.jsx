import { formatDistanceToNow, parseISO } from "date-fns";
import { memo } from "react";

const TimeAgo = memo(({ timestamp }) => {
  let timeago = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeago = `${timePeriod} ago`;
  }
  return (
    <>
      <span className="font-bold text-gray-600 text-[12px] ms-4">{timeago ? timeago : "just now"}</span>
    </>
  );
})
export default TimeAgo;
