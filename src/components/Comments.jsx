import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import Button from './shared/Button';

const Buttons = styled.div`
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
`;

const FilterButton = styled(Button)`
  border: ${props => props.selected ? '2px solid black' : 'none'};
`

function Comments({ allComments, commentsLoaded, setCommentsLoaded }) {
  const [comments, setComments] = useState([]);
  const [unseen, setUnseen] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewUnseen, setViewUnseen] = useState(true);

  useEffect(() => {
    setUnseen(filterUnseen(allComments));
    setComments(allComments);
  }, [allComments])

  const removeUnseen = (id) => {
    const filtered = unseen.filter(comment => comment.id !== id);
    setUnseen(filtered);
  }

  const handleViewAll = (e) => {
    e.preventDefault();
    if (viewUnseen) {
      setViewAll(true);
      setViewUnseen(false);
    }
  }

  const handleViewUnseen = (e) => {
    e.preventDefault();
    if (viewAll) {
      setViewAll(false);
      setViewUnseen(true);
    }
  }

  const filterUnseen = (data) => {
    const filteredComments = data.filter(comment => !comment.answered)
    return filteredComments;
  }

  if (commentsLoaded) {
    return (
      <>
        <Buttons>
          <FilterButton selected={viewAll === true} onClick={e => handleViewAll(e)}>All</FilterButton>
          <FilterButton selected={viewUnseen === true} onClick={e => handleViewUnseen(e)}>Unseen</FilterButton>
        </Buttons>
        <div>
          {
            viewAll &&
            comments.map(comment => (
              <Comment
                comment={comment}
                seen={true}
                setCommentsLoaded={setCommentsLoaded}
              />
              ))
          }
          {
            viewUnseen &&
            unseen.map(comment => (
              <Comment
                comment={comment}
                removeUnseen={removeUnseen}
                setCommentsLoaded={setCommentsLoaded}
              />
            ))
          }
        </div>
      </>
    )
  } else {
    return (
      <>
        <Buttons>
          <FilterButton selected={viewAll} onClick={e => handleViewAll(e)}>All</FilterButton>
          <FilterButton selected={viewUnseen} onClick={e => handleViewUnseen(e)}>Unseen</FilterButton>
        </Buttons>
      </>
    )
  }
}

export default Comments;