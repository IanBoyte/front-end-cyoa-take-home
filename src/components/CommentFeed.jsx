import React, { Fragment, useState, useEffect, useRef } from "react";

import CommentSubmission from "./CommentSubmission";
import CommentList from "./CommentList";

import spinnerImg from "../images/loading.svg";

function CommentFeed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useNotifications, setUseNotifications] = useState(false);
  const [items, setItems] = useState([]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // fetch comments from server
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
          setError(
            "There was an error retrieving comments. Please try again later."
          );
        }
      );
  };

  // fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  // fetch comments at each interval
  useInterval(() => {
    fetchComments(items);
  }, 10000);

  // set notification permission
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setUseNotifications(true);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            setUseNotifications(true);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (useNotifications) {
      new Notification("You have new comments.");
    }
  }, [items.length]);

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
