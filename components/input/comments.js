import { useContext, useEffect, useState } from 'react';

import NotificationContext from '../../store/notification-context';
import { addCommentAPI, getCommentsAPI } from '../../api';

import CommentList from './comment-list';
import NewComment from './new-comment';

import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    const loadComents = async () => {
      setIsLoadingComments(true);
      const comments = await getCommentsAPI(eventId);
      setComments(comments);
      setIsLoadingComments(false);
    };
    if (showComments) {
      loadComents();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Youre comment is currently saved.',
      status: 'pending',
    });

    try {
      const response = await addCommentAPI(eventId, commentData);
      if (response.ok) {
        const comments = await getCommentsAPI(eventId);
        setComments(comments);

        notificationCtx.showNotification({
          title: 'Success',
          message: 'Your comment has been saved!',
          status: 'success',
        });
      } else {
        throw new Error(response.message || 'Something went wrong.');
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
  }

  const isLoading = showComments && isLoadingComments;
  const isComments = showComments && !isLoadingComments;

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {isLoading && <p>Loading comments...</p>}
      {isLoading && <NewComment onAddComment={addCommentHandler} />}
      {isComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
