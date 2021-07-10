import React, { useState } from "react";

import Comment from "./Comment";

function CommentList(props) {
  return (
    <div className="comment-list">
      {props.commentListData.map((commentData, i) => {
        return (
          <Comment
            key={commentData.id}
            created={commentData.created}
            userName={commentData.name}
            message={commentData.message}
          />
        );
      })}
    </div>
  );
}

export default CommentList;
