import React, { useState } from 'react';
import CommentFormComponent from './CommentFormComponent';
import PropTypes from 'prop-types';

function CommentFormContainer({ comment, setCommentsLoaded, setEditing }) {
  const [data, setData] = useState({
    name: comment.name,
    content: comment.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (data.content.length < 1 || data.content.length > 1000) {
      return alert('wrongo');
    }
    setData({ name: '', content: '' });
    const { recipe, level, parent, created, answered, fromAdmin } = comment;
    // fetch('/api/comments/', {
    fetch(`/comments/${comment._id}`, {

    // fetch('https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        content: data.content,
        recipe: recipe._id,
        level: level,
        parent: parent,
        created: created,
        answered: answered,
        fromAdmin: fromAdmin
      })
    })
      .then(response => {
        if (response.ok && response.status === 200) {
          setCommentsLoaded(false);
          setEditing(false);
          return;
        }
        throw new Error('Network response was not okay');
      })
      .catch(err => console.log(err.message));
  }

  return (
    <CommentFormComponent
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      data={data}
    />
  )
}

CommentFormContainer.propTypes = {
  comment: PropTypes.object,
  setCommentsLoaded: PropTypes.func,
}

export default CommentFormContainer;