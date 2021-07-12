import React from "react";
import { format } from "date-fns";

function Comment(props) {
  // format date
  const now = new Date();
  const createdDate = new Date(props.created + "+00:00"); // +00:00 accounting for unset timezone in date string

  // check if date is within a week or current year
  let formattedDate;
  if (now.getTime() < createdDate.getTime() + 1000 * 60 * 60 * 24 * 7) {
    // if date is in past week, compare number of milliseconds in a week
    formattedDate = format(createdDate, "cccc");
  } else if (now.getFullYear() === createdDate.getFullYear()) {
    // if date is in current year
    formattedDate = format(createdDate, "MMMM do");
  } else {
    // otherwise if date is in previous year
    formattedDate = format(createdDate, "MMMM do, y");
  }

  const formattedDateTime = `${formattedDate} at ${format(
    createdDate,
    "hbbb"
  )}`;

  return (
    <div className="comment-item">
      <p className="message-text">{props.message}</p>
      <p className="message-byline">{`${props.userName} on ${formattedDateTime}`}</p>
    </div>
  );
}

export default Comment;
