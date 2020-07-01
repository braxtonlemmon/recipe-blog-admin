import React, { useState } from 'react';
import ReplyFormComponent from './ReplyFormComponent';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ReplyFormContainer({ parent, recipe, setCommentsLoaded, handleReply }) {
  const history = useHistory();
  const [data, setData] = useState({
    name: 'Braxton',
    content: '',
    parent: parent,
    recipe: recipe,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e, level) => {
    e.preventDefault();
    handleReply();
    if (data.content.length < 1 || data.content.length > 1000) {
      return alert('wrongo');
    }
    setData({ name: '', content: '' });
    // fetch('/api/comments/', {
    fetch(`/comments`, {

      // fetch('https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        content: data.content,
        recipe: data.recipe._id,
        parent: data.parent,
        level: level,
        answered: true,
        fromAdmin: true
      })
    })
      .then(response => {
        if (response.ok && response.status === 200) {
          setCommentsLoaded(false);
          return response.json();
        }
        throw new Error('Network response was not okay');
      })
      .catch(err => console.log(err.message));
  }

  return (
    <ReplyFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
    />
  )
}

ReplyFormContainer.propTypes = {
  parent: PropTypes.string,
  recipe: PropTypes.string,
  setCommentsLoaded: PropTypes.func,
}

export default ReplyFormContainer;