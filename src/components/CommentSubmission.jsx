import React, { useState } from "react";

function CommentSubmission(props) {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const commentSubmission = (userName, message, callback) => {
    // test values
    if (userName.trim().length === 0 || message.trim().length === 0) {
      setHasError(true);
      return;
    }
    setHasError(false);

    const data = { name: userName, message: message };
    fetch("/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof callback === "function") {
          callback();
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        if (typeof callback === "function") {
          callback();
        }
        console.error("Error:", error);
      });
  };

  return (
    <div className="comment-submission">
      <label>Name</label>
      <input
        type="text"
        aria-label="Name"
        aria-required="true"
        onChange={(e) => setUserName(e.target.value)}
        name="userName"
      />
      <textarea // max value?
        type="text"
        aria-label="Comment"
        aria-required="true"
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      />
      {hasError && <p className="error-text">Please complete the form</p>}
      <button
        className="cta"
        onClick={() => {
          commentSubmission(userName, message, props.onSubmitCallback);
        }}
      >
        Comment
      </button>
    </div>
  );
}

export default CommentSubmission;
