import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useHistory } from 'react-router-dom';
import Button from './shared/Button';

const Buttons = styled.div`
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
`;

function Comments() {
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [viewAll, setViewAll] = useState(true);
  const [viewUnseen, setViewUnseen] = useState(false);


  const handleViewAll = (e) => {
    e.preventDefault();
    if (viewUnseen) {
      setViewAll(true);
      setViewUnseen(false);
    }
  }

  const handleViewUnseen = (e) => {
    e.preventDefault();
    if (viewAll) {
      setViewAll(false);
      setViewUnseen(true);
    }
  }

  // #createComment and #updateComment
  // new Comment and parentComment.answered: true
  const handleReply = (e) => {
    e.preventDefault();
    console.log('reply to comment')
  }

  // #updateComment comment.answered: true
  const handleView = (e, id) => {
    e.preventDefault();
    console.log(`comment ${id} viewed...`);
  }
  
  // #deleteComment
  const handleDelete = (e, id) => {
    e.preventDefault();
    const verify = window.confirm('Are you sure you want to delete this comment?');
    if (verify === true) {
      fetch(`/comments/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          history.push('/comments');
          return response.json();
        }
        throw new Error('Network response was not okay.');
      })
      .catch(err => console.log(err.message));
    }
  }


  useEffect(() => {
    fetch('/comments', {
      method: 'GET',
      credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
      setComments(data.data);
      setCommentsLoaded(true);
    })
    .catch(err => console.log(err))
  }, [commentsLoaded])

  if (commentsLoaded) {
    return (
      <>
        <Buttons>
          <Button onClick={e => handleViewAll(e)}>All</Button>
          <Button onClick={e => handleViewUnseen(e)}>Unseen</Button>
        </Buttons>
        <div>
          {
            viewAll &&
            comments.map(comment => (
              <Comment
              comment={comment}
              setCommentsLoaded={setCommentsLoaded}
              handleDelete={handleDelete}
              handleView={handleView}
              />
              ))
          }
          {viewUnseen &&
            <h2>yo</h2>
          }
        </div>
      </>
    )
  } else {
    return (
      <h1>loading...</h1>
    )
  }
}

export default Comments;