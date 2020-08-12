import React, { useEffect, useState } from 'react';
import NewsletterFormComponent from './NewsletterFormComponent';
import { useParams, useHistory } from 'react-router-dom';

function makeSlug(title) {
  const strippedTitle = title.replace(/[^\w\s]/gi, '');
  return strippedTitle.toLowerCase().replace(/ /g, '-');
}

function NewsletterFormContainer({ setRecipesLoaded }) {
  const history = useHistory();
  const { recipeid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    url: '',
    subject: ''
  });

  useEffect(() => {
    if (recipeid) {
      fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${recipeid}`)
      .then(result => result.json())
      .then(data => {
        console.log(data)
        setRecipe(data.data)
      })
      .catch(err => console.log(err.message))
    }
  }, [recipeid])

  useEffect(() => {
    if (recipe !== null) {
      const slug = makeSlug(recipe.title);
      
      setFormData(formData => ({
        ...formData,
        title: recipe.title,
        description: recipe.description,
        imgUrl: recipe.images[0],
        url: `https://www.peelthegarlic.com/recipe/${slug}`,
        subject: ''
      }))
    }
  }, [recipe])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleTestSubmit = (e) => {
    e.preventDefault();
    fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/newsletter/test`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        imgUrl: formData.imgUrl,
        url: formData.url
      })
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error("Network response was not okay upon sending test newsletter");
    })
    .then(data => {
      console.log('test newsletter sent');
      history.push('/recipes');
    })
    .catch(err => console.log(err.message));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/newsletter`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        imgUrl: formData.imgUrl,
        url: formData.url
      })
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error("Network response was not okay upon sending newsletter");
    })
    .then(data => {
      console.log('newsletter sent');
      fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${recipeid}/newsletter`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': sessionStorage.getItem('token')
        },
        // credentials: 'include',
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        throw new Error('Network response was not okay upon updating newsletter status of recipe');
      })
      .then(data => {
        console.log(data);
        setRecipesLoaded(false);
        history.push('/recipes');
      })
    })

    .catch(err => console.log(err.message));
  }

  return (
    <>
      <NewsletterFormComponent
        formData={formData}
        handleChange={handleChange}
        handleTestSubmit={handleTestSubmit}
        handleSubmit={handleSubmit}
      />  
    </>
  )
}

export default NewsletterFormContainer;
