import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Routing from './components/Routing';
import Footer from './components/Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  margin-bottom: 3.5em;
  grid-area: main;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);

  const history = useHistory();

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  }

  // Fish for JWT
  useEffect(() => {
    fetch(
      "https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/me", 
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': sessionStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not yet logged in");
        }
      })
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.log("problem"));
  }, [])

  // GET recipes from API
  useEffect(() => {
    fetch("https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes")
      .then((result) => result.json())
      .then((data) => setRecipes(data.data))
      .then(() => setRecipesLoaded(true))
      .catch((err) => console.log(err));
  }, [recipesLoaded])

  // GET comments from API
  useEffect(() => {
    fetch("https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments")
      .then((result) => result.json())
      .then((data) => setComments(data.data))
      .then(() => setCommentsLoaded(true))
      .catch((err) => console.log(err));
  }, [commentsLoaded])
  
  const handleLogout = () => {
    fetch("https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/auth/logout")
      .then(() => {
      setIsLoggedIn(false);
      sessionStorage.removeItem('token');
      setCurrentUser(null);
      history.push("/login");
    });
  }

  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header 
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <Main>
        <Routing 
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          recipes={recipes}
          comments={comments}
          recipesLoaded={recipesLoaded}
          commentsLoaded={commentsLoaded}
          setCommentsLoaded={setCommentsLoaded}
          setRecipesLoaded={setRecipesLoaded}
        />
      </Main>

      <Footer 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </Wrapper>
  );
}

export default App;
