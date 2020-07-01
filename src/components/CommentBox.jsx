import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  h2 {
    margin: 10px 0 15px 0;
  }
  border-top: 5px solid black;
  align-items: center;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 2px dashed black;
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
    text-decoration: underline;
  }
  .comment-date {
    font-size: 0.8em;
    font-style: italic;
  }
  .comment-delete {
    align-self: flex-end;
    height: 1.3em;
    width: 1.3em;
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
    cursor: pointer;
    &:hover {
      color: white;
      background: black;
    }
  }
`;

function CommentBox(props) {
  const handleDelete = (id, recipe) => {
    const verify = window.confirm('Are you sure you want to delete this comment?');
    if (verify === true) {
      fetch(
        `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
        .then((response) => {
          if (response.ok && response.status === 200) {
            props.setRecipeCommentsLoaded(false);
            return;
          }
          throw new Error("Network response was not okay.");
        })
        .catch((err) => console.log("w"));
    }
  }

  const generateComments = () => {
    let allComments = [];
    props.comments.map((comment, i) => {
      return allComments.push(
        <CommentRow key={i}>
          <div 
            className="comment-delete"
            onClick={() => handleDelete(comment._id, comment.recipe)}
          >x</div>
          <div className="comment-info">
            <span className="comment-name">{comment.name.toUpperCase()}</span>
            <span className="comment-date">{comment.dateFormatted}</span>
          </div>
          <p>{comment.content}</p>
        </CommentRow>
      )
    })
    return allComments;
  }
  if (props.commentsLoaded) {
    return (
      <Wrapper>
        <h2>COMMENTS</h2>
        <div>{
          props.comments.length === 0 ?
          '- No comments yet -' :
          generateComments()}
        </div>
      </Wrapper>
    )
  } else {
    return (
      <h1>loading...</h1>
    )
  }

}

export default CommentBox;