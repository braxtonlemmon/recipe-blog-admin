import React, { useState } from 'react';
import styled from 'styled-components';
import ReplyFormContainer from './ReplyFormContainer';
import PropTypes from 'prop-types';
import Button from './Button';

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 15px;
  /* padding-bottom: 30px; */
  background: rgba(247, 191, 247, 0.78);
  box-shadow: -2px 2px 2px lightgrey;
  margin: 15px;
  border-radius: 8px;
  transition: all 5s ease;
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
    letter-spacing: 1.5px;
    font-style: italic;
  }
  .comment-date {
    font-size: 0.8em;
    font-style: italic;
  }
  .comment-content {
    margin: 5px 20px;
    align-self: center;
    text-align: justify;
  }
  .comment-reply {
    height: 20px;
    width: 100%;
    border: 1px solid black;
  }
`;

const Buttons = styled.div`
  width: 90%;
  border-top: 1px solid grey;
  margin-top: 15px;
  padding-top: 10px;
  display: flex;
  align-self: center;
  justify-content: space-around;
`;

const ReplyButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 3px;
  `;

function Comment({ comment, setCommentsLoaded, handleDelete, handleView }) {
  const [replyClicked, setReplyClicked] = useState(false);

  const handleReplyClick = () => {
    setReplyClicked(!replyClicked);
  }

  return (
    <CommentRow
      key={comment._id}
      id={comment._id}
    >
      <div className="comment-info">
        <span className="comment-name">{comment.name.toUpperCase()}</span>
        <span className="comment-date">{comment.dateFormatted}</span>
      </div>
      <p className="comment-content">{comment.content}</p>
      {replyClicked &&
        <ReplyFormContainer
          parent={comment._id}
          recipe={comment.recipe}
          setCommentsLoaded={setCommentsLoaded}
        />
      }
      <Buttons>
        <Button onClick={e => handleView(e, comment._id)}>Seen</Button>
        <Button>Edit</Button>
        <Button onClick={e => handleDelete(e, comment._id)}>Delete</Button>
        <Button onClick={handleReplyClick}>{replyClicked ? 'Close' : 'Reply'}</Button>
      </Buttons>
      {/* <ReplyButton onClick={handleReplyClick}>{replyClicked ? 'Close' : 'Reply'}</ReplyButton> */}
    </CommentRow>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
  setCommentsLoaded: PropTypes.func,
}

export default Comment;