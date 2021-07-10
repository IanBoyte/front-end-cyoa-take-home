import React, { Fragment, useState, useEffect } from "react";

import CommentSubmission from "./CommentSubmission";
import CommentList from "./CommentList";

import spinnerImg from "../images/loading.svg";
import { text } from "body-parser";

function CommentFeed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchComments = () => {
    fetch("/getComments")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchComments();
    setInterval(() => {
      fetchComments();
    }, 10000);
  }, []);

  const onSubmit = () => {
    fetchComments();
  };

  return (
    <div className="comment-feed">
      {isLoaded ? (
        <Fragment>
          {error ? (
            <p className="error-text">{error}</p>
          ) : (
            <Fragment>
              <CommentSubmission onSubmitCallback={onSubmit} />
              <CommentList commentListData={items} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <img src={spinnerImg} className="loading-img" alt="loading" />
      )}
    </div>
  );
}

export default CommentFeed;
