import React from 'react';
import { H1 } from './Shared';
import {
  Form,
  Row,
  RowTop,
  Button,
  MoveButtons,
  Box
} from './RecipeFormStyling';

function RecipeFormComponent(props) {
  const down = '↓';
  const up = '↑';
  const trash = '🗑';

  return (
    <>
      <H1>{props.isUpdating ? 'Edit Recipe' : 'New Recipe'}</H1>
      <Form name="recipeForm">
        <Box className="images-box">
          <h2>Images</h2>
          {props.data.images.map((image, index) => (
            <Row key={`image~${index}`}>
              <RowTop>
                <Button
                  tabIndex="-1"
                  onClick={(e) => props.handleRemoveImage(e, index)}
                >{trash}</Button>
                <label htmlFor="image">image {index + 1}</label>
                <MoveButtons>
                  <Button
                    tabIndex="-1"
                    onClick={(e) => props.handleMove(e, index, 'image', 'up')}
                  >{up}</Button>
                  <Button
                    tabIndex="-1"
                    onClick={(e) => props.handleMove(e, index, 'image', 'down')}
                  >{down}</Button>
                </MoveButtons>
              </RowTop>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Image"
                value={props.data.images[index]}
                onChange={(e) => props.handleInputChange(index, e)}
                required
              />
            </Row>
          ))}
          <Button
            onClick={props.handleAddImage}
          >+</Button>
        </Box>
        <Box>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Recipe title"
            value={props.data.title}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box>
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="Serving size"
            value={props.data.size}
            onChange={props.handleChange}
            required
          />
        </Box>
        {/* <Box>
          <label htmlFor="duration">Duration (min)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={props.data.duration}
            onChange={props.handleChange}
            required
          />
        </Box> */}
        <Box>
          <label htmlFor="prep_time">Prep time (min)</label>
          <input
            type="number"
            id="prep_time"
            name="prep_time"
            value={props.data.prep_time}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box>
          <label htmlFor="cook_time">Cook time (min)</label>
          <input
            type="number"
            id="cook_time"
            name="cook_time"
            value={props.data.cook_time}
            onChange={props.handleChange}
            required
          />
        </Box>

        <Box>
          <label htmlFor="description">Short recipe description</label>
          <textarea
            name="description"
            id="description"
            value={props.data.description}
            onChange={props.handleChange}
            cols="30"
            rows="10"
            placeholder="Description of recipe"
            required
          ></textarea>
        </Box>
        <Box>
          <label htmlFor="intro">Blog section</label>
          <textarea
            name="intro"
            id="intro"
            value={props.data.intro}
            onChange={props.handleChange}
            cols="30"
            rows="10"
            placeholder="Blog intro section"
            required
          ></textarea>
        </Box>
        <Box>
          <label htmlFor="quote">Quote</label>
          <textarea
            name="quote"
            id="quote"
            value={props.data.quote}
            onChange={props.handleChange}
            placeholder="Quote about recipe"
            required
          ></textarea>
        </Box>
        <Box>
          <label htmlFor="keywords">Keywords (comma-separated)</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="Recipe keywords"
            value={props.data.keywords}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box>
          <label htmlFor="category">Category (dinner, lunch, dessert, etc.)</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Recipe category"
            value={props.data.category}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box>
          <label htmlFor="cook_method">Cooking method (bake, roast, fry, etc.) (</label>
          <input
            type="text"
            id="cook_method"
            name="cook_method"
            placeholder="Recipe cook_method"
            value={props.data.cook_method}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box>
          <label htmlFor="cuisine">Cuisine (French, American, etc.)</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            placeholder="Recipe cuisine"
            value={props.data.cuisine}
            onChange={props.handleChange}
            required
          />
        </Box>
        <Box className="ingredients-box">
          <h2>Ingredients</h2>
          {props.data.ingredients.map((ingredient, index) => (
            <Row key={`ingredient~${index}`}>
              <RowTop>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleRemoveIngredient(e, index)}
                >{trash}</Button>
                <label htmlFor="ingredient">Ingredient {index + 1}</label>
                <MoveButtons>
                  <Button 
                    tabIndex="-1" 
                    onClick={(e) => props.handleMove(e, index, 'ingredient', 'up')}
                  >{up}</Button>
                  <Button 
                    tabIndex="-1" 
                    onClick={(e) => props.handleMove(e, index, 'ingredient', 'down')}
                  >{down}</Button>
                </MoveButtons>
              </RowTop>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                placeholder="Ingredient"
                value={props.data.ingredients[index]}
                onChange={(e) => props.handleInputChange(index, e)}
                required
              />
            </Row>
          ))}
          <Button 
            onClick={props.handleAddIngredient}
          >+</Button>
        </Box>
        <Box className="steps-box">
          <h2>Steps</h2>
          {props.data.steps.map((step, index) => (
            <Row key={`step~${index}`}>
              <RowTop>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleRemoveStep(e, index)}
                >{trash}</Button>
                <label htmlFor="step">{`Step ${index + 1}`}</label>
                <MoveButtons>
                  <Button 
                    tabIndex="-1" 
                    onClick={(e) => props.handleMove(e, index, 'step', 'up')}
                  >{up}</Button>
                  <Button 
                    tabIndex="-1" 
                    onClick={(e) => props.handleMove(e, index, 'step', 'down')}
                  >{down}</Button>
                </MoveButtons>
              </RowTop>
              <textarea
                className="step"
                id="step"
                name="step"
                placeholder="Step"
                value={props.data.steps[index]}
                onChange={(e) => props.handleInputChange(index, e)}
                required
              ></textarea>
            </Row>
          ))}
          <Button 
            onClick={props.handleAddStep}
          >+</Button>
        </Box>
        <Box className="publish-box">
          <div className="publish-row">
            <label htmlFor="is_published">Publish?</label>
            <input
              className="checkbox" 
              type="checkbox" 
              name="is_published" 
              id="is_published"
              checked={props.data.is_published}
              onChange={props.handleChange}
            />
          </div>
        </Box>
        <Button 
          onClick={props.isUpdating ? props.handleUpdate : props.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default RecipeFormComponent;
