import React, { useState } from 'react';
import styled from 'styled-components';
import ReplyFormContainer from './ReplyFormContainer';
import PropTypes from 'prop-types';
import Button from './Button';
import CommentFormContainer from './CommentFormContainer';
import { Link } from 'react-router-dom';

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 15px;
  /* padding-bottom: 30px; */
  background: ${props => props.fromAdmin ? 'lightgreen' : 'rgba(247, 191, 247, 0.78)'};
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
  .comment-recipe {
    padding: 10px;
    color: darkblue;
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

function Comment({ comment, setCommentsLoaded, seen, removeUnseen }) {
  const [replyClicked, setReplyClicked] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleReplyClick = () => {
    setReplyClicked(!replyClicked);
  }
  
  const handleView = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { id, name, content, recipe, parent, level, fromAdmin } = comment;
    console.log(`comment ${id} viewed...`);
    fetch(`/comments/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        content,
        recipe,
        parent,
        level,
        answered: !comment.answered,
        fromAdmin,
      })
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error('Network response was not okay');
    })
    .then(data => {
      removeUnseen(id);
      console.log(data);
    })
    .catch(err => console.log(err.message));
  }

  const handleReply = () => {
    if (comment.answered !== true) {
      handleView(null, comment._id)
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(`editing ${comment._id}`)
    setEditing(old => !old)
  }
 
  const handleDelete = (e) => {
    e.preventDefault();
    const verify = window.confirm('Are you sure you want to delete this comment?');
    if (verify === true) {
      fetch(`/comments/${comment._id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
        .then(response => {
          if (response.ok && response.status === 200) {
            setCommentsLoaded(false);
            return;
          }
          throw new Error('Network response was not okay.');
        })
        .catch(err => console.log(err.message));
    }
  }


  return (
    <CommentRow
      key={comment._id}
      id={comment._id}
      fromAdmin={comment.fromAdmin}
    >
      <div className="comment-info">
        <span className="comment-name">{comment.name.toUpperCase()}</span>
        <span className="comment-date">{comment.dateFormatted}</span>
      </div>
      { 
        editing
        ? <CommentFormContainer 
            setCommentsLoaded={setCommentsLoaded}
            comment={comment}
            setEditing={setEditing}
          />
        : <p className="comment-content">{comment.content}</p>
      }
      <Link className="comment-recipe" to={`/recipes/${comment.recipe._id}`}>{comment.recipe.title}</Link>
      {replyClicked &&
        <ReplyFormContainer
          parent={comment._id}
          recipe={comment.recipe}
          setCommentsLoaded={setCommentsLoaded}
          handleReply={handleReply}
        />
      }
      <Buttons>
        {!seen && 
        <Button onClick={handleView}>Seen</Button> 
        }
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleReplyClick}>{replyClicked ? 'Close' : 'Reply'}</Button>
      </Buttons>
    </CommentRow>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
  setCommentsLoaded: PropTypes.func,
}

export default Comment;