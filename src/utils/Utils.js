import Cookies from 'js-cookie';

function getRecipe(id) {
  let recipe = {};
  fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${id}`)
    .then((result) => result.json())
    .then((data) => {
      recipe = data.data;
    });
  return recipe
}

function getSession() {
  const jwt = Cookies.get('token');
  let session = false;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      session = JSON.parse(window.atob(base64));
      console.log('hooray');
    }
  } catch (error) {
    console.log(error)
  }
  return session
}

function isLoggedIn() {
  const jwt = Cookies.get('token');
  console.log(jwt);
  try {
    if (jwt) {
      return true;
    }
    else {
      return false
    }
  }
  catch(err) {
    console.log(err);
  }

}

export {
  getRecipe,
  isLoggedIn
}