import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 80%;
  label {
    padding: 8px;
  }
  input {
    padding: 10px 5px;
    line-height: 1.4em;
    font-size: 1.1em;
    text-align: center;
    outline: none;
    background: #fbfaff;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  textarea {
    resize: none;
    outline: none;
    padding: 10px;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 10px;
    background: #fbfaff;
    border: 1px solid lightgray;
  }
`;

function CommentFormComponent({ data, handleChange, handleUpdate}) {
  return (
    <FormWrapper name="commentForm">
      <label htmlFor="content">Comment</label>
      <textarea
        name="content"
        id="content"
        required
        min="1"
        placeholder="Your comment here..."
        value={data.content}
        onChange={handleChange}
      >
      </textarea>

      <Button
        onClick={handleUpdate}
      >
        Update
      </Button>
    </FormWrapper>

  )
}

CommentFormComponent.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default CommentFormComponent;