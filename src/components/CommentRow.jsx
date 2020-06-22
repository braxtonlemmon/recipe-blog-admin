import styled from 'styled-components';
import Button from './shared/Button';

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 15px;
  padding-bottom: 30px;
  background: rgba(247, 191, 247, 0.78);
  box-shadow: -2px 2px 2px lightgrey;
  margin: 15px;
  margin-left: ${props => props.margin}px;
  border-radius: 8px;
  transition: all 5s ease;
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
    letter-spacing: 1.5px;
    font-style: italic;
  }
  .comment-date {
    font-size: 0.8em;
    font-style: italic;
  }
  .comment-content {
    margin: 5px 20px;
    align-self: center;
    text-align: justify;
  }
  .comment-reply {
    height: 20px;
    width: 100%;
    border: 1px solid black;
  }
`;

const ReplyButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 3px;
`;

function Comment() {
  return (
    
  )
}

export default Comment;