import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import Recipes from './Recipes';
import RecipeFormContainer from './RecipeFormContainer';
import NoMatch from './NoMatch';
import RecipePage from './RecipePage';
import Comments from './Comments';
import NewsletterFormContainer from './NewsletterFormContainer';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn === true 
    ? <Component {...props} {...rest}/> 
    : <Redirect to='/login' />
  )} />
)

function Routing({
  isLoggedIn,
  handleLogin,
  recipes,
  comments,
  recipesLoaded,
  commentsLoaded,
  setRecipesLoaded,
  setCommentsLoaded,
}) {
  
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={Recipes}
        recipes={recipes}
        recipesLoaded={recipesLoaded}
        setRecipesLoaded={setRecipesLoaded}
        setCommentsLoaded={setCommentsLoaded}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute 
        exact 
        path='/comments'               
        component={Comments}
        allComments={comments}
        commentsLoaded={commentsLoaded}
        setCommentsLoaded={setCommentsLoaded}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute
        exact
        path='/newsletter/:recipeid'
        component={NewsletterFormContainer}
        isLoggedIn={isLoggedIn}
        setRecipesLoaded={setRecipesLoaded}
      />
      <PrivateRoute 
        exact 
        path='/recipes'
        component={Recipes}
        recipes={recipes}
        recipesLoaded={recipesLoaded}
        setRecipesLoaded={setRecipesLoaded}
        setCommentsLoaded={setCommentsLoaded}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute
        exact
        path='/new'                    
        component={RecipeFormContainer} 
        setRecipesLoaded={setRecipesLoaded}
        isLoggedIn={isLoggedIn}
        isNew
      />
      <PrivateRoute 
        path='/recipes/:recipeid/edit' 
        component={RecipeFormContainer} 
        setRecipesLoaded={setRecipesLoaded}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute 
        path='/recipes/:id'            
        component={RecipePage} 
        isLoggedIn={isLoggedIn}
        setCommentsLoaded={setCommentsLoaded}
        commentsLoaded={commentsLoaded}
      />
      <Route path="/login">
        <LoginFormContainer
          handleLogin={handleLogin}
          isLoggedIn={isLoggedIn}
        />
      </Route>
      <Route path="*" component={NoMatch} />
    </Switch>
  )
}

export default Routing;

