import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1 } from './Shared';
import Emoji from 'a11y-react-emoji';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1.5fr 1fr 25px 25px;
  .item {
    border: 1px solid black;
    text-align: center;
    padding: 8px 5px;
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
  a {
    color: #6c6cff;
    &:hover {
      color: #1d1dff;
    }
  }
`;

function Recipes({ recipes, recipesLoaded, setRecipesLoaded, setCommentsLoaded }) {
  const handleDelete = (id) => {
    const verify = window.confirm('Are you sure you want to delete this recipe?');
    if (verify === true) {
      fetch(
        `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': sessionStorage.getItem('token')
          },
          body: JSON.stringify({
            recipeid: id,
          }),
        }
      )
        .then((response) => {
          if (response.ok && response.status === 200) {
            setRecipesLoaded(false);
            setCommentsLoaded(false);
            return response.json();
          }
          throw new Error("Network response was not okay.");
        })
        .catch((err) => console.log(err.message));
    }
  }

  const handlePublish = (e) => {
    console.log(e.target.checked);
  }
    
  if (recipesLoaded) {
    return (
      <Wrapper>
        <H1>Recipes</H1>
        <ul>
          <Row>
            <p className="header item">Recipe</p>
            <p className="header item">Published</p>
            <p className="header item"></p> {/* publish toggle button */}
            <p className="header item"></p> {/* edit */}
            <p className="header item"></p> {/* trash */}
            <p className="header item"></p> {/* send newsletter */}
            <p className="header item"></p> {/* sent? */}
          </Row>
          {recipes.map((recipe, index) => (
            <Row key={recipe.title}>
              {/* title */}
              <div className="item">
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.title}</p>
                </Link>
              </div>
              
              {/* publish date */}
              <div className="item">
                <p>{recipe.is_published ? recipe.publish_date_formatted : 'Not yet'}</p>
              </div>
              
              {/* publish toggle button */}
              <div className="item"> 
                {recipe.is_published ? '1': '0'}
              </div>

              {/* edit */}
              <div className="item">
                <Link to={`/recipes/${recipe._id}/edit`}>
                  <Emoji symbol="🖉" label="edit" />
                </Link>
              </div>

              {/* delete */}
              <div className="item">
                <Emoji 
                  className="button" 
                  onClick={() => handleDelete(recipe._id)}
                  symbol="🗑️"
                  label="delete"
                />
              </div>

              {/* send newsletter */}
              <div className="item">
                <Link to={`/newsletter/${recipe._id}`}>
                  <Emoji symbol="🖂" label="send" />
                </Link>
              </div>

              {/* newsletter sent? */}
              <div className="item">
                {recipe.newsletter ? '1' : '0'}
              </div>
            </Row>
          ))}
        </ul>
      </Wrapper>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default Recipes;