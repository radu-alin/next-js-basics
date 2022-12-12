import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

const getCommentsHelper = async (eventId) => {
  const response = await fetch('/api/comments/' + eventId, {
    method: 'GET',
  });
  const data = await response.json();
  return data.comments;
};

const addCommentHelper = async (eventId, commentData) => {
  return await fetch('/api/comments/' + eventId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
};

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComents = async () => {
      const comments = await getCommentsHelper(eventId);
      setComments(comments);
    };
    if (showComments) {
      loadComents();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    await addCommentHelper(eventId, commentData);

    const comments = await getCommentsHelper(eventId);

    setComments(comments);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
