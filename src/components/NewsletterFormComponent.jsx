import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Box, Form } from './RecipeFormStyling';
import { H1 } from './Shared';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  width: 90%;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

function NewsletterFormComponent({ 
  formData, 
  handleChange, 
  handleTestSubmit, 
  handleSubmit 
}) {
  return (
    <Wrapper>
      <H1>Newsletter</H1>
      <Form>
        {/* title */}
        <Box>
          <label htmlFor="title">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        {/* description */}
        <Box>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            cols="30"
            rows="10"
            required
          ></textarea>
        </Box>
        {/* imgUrl */}
        <Box>
          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            required
          />
        </Box>
        {/* url */}
        <Box>  
          <label htmlFor="url">Website URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </Box>
        {/* subject */}
        <Box>
          <label htmlFor="subject">Email Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Box>
        <Buttons>
          <Button onClick={handleTestSubmit}>TEST</Button>
          <Button onClick={handleSubmit}>SUBMIT</Button>
        </Buttons>
      </Form>
    </Wrapper>
  )
}

NewsletterFormComponent.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  handleTestSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default NewsletterFormComponent;