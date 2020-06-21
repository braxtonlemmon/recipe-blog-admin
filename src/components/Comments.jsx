import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


function Comments() {
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

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
  }, [])

  if (commentsLoaded) {
    return (
      <div>
        {comments.map(comment => (
          <p>{comment.content}</p>
        ))}
      </div>
    )
  } else {
    return (
      <h1>loading...</h1>
    )
  }
}

export default Comments;