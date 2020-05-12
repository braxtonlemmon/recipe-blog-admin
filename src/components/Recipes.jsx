import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 2fr 1.2fr 1.2fr;
  .item {
    border: 1px solid black;
    text-align: center;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    font-weight: bold;
  }
  .button {
    cursor: pointer;
  }
`;

function Recipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    fetch('/recipes', {
      method: 'get'
    })
    .then(result => result.json())
    .then(data => setRecipes(data.data))
    .then(() => setRecipesLoaded(true))
  }, [])

  const handleDelete = (id) => {
    fetch(`/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        recipeid: id
      })
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        history.push('/recipes');
        return response.json();
      }
      throw new Error('Network response was not okay.');
    })
    .catch(err => console.log(err.message));
  }

  if (recipesLoaded) {
    return (
      <Wrapper>
      <h1>RECIPES</h1>
      <ul>
        <Row>
          <p className="header item">Recipe</p>
          <p className="header item">Created</p>
          <p className="header item">Published</p>
          <p className="header item">Edit</p>
          <p className="header item">Delete</p>
        </Row>
        {recipes.map(recipe => (
          <Row key={recipe.title}>
            <div className="item">
              <Link to={`/recipes/${recipe._id}`}><p>{recipe.title}</p></Link>
            </div>
            <div className="item">
              <p>{recipe.date_formatted}</p>
            </div>
            <div className="item">
              <p>{recipe.published ? 'Yes' : 'No'}</p>
            </div>
            <div className="item">
              <Link to={`/recipes/${recipe._id}/edit`}>
                <p>edit</p>
              </Link>
            </div>
            <div className="item">
              <p className='button' onClick={() => handleDelete(recipe._id)}>🗑</p>
            </div>
          </Row>
        ))}
      </ul>
      </Wrapper>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default Recipes;