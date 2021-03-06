import React, { useState, useEffect } from 'react';
import RecipeFormComponent from './RecipeFormComponent';
import { useParams, useHistory } from 'react-router-dom';

function RecipeFormContainer({ setRecipesLoaded, isNew }) {
  const history = useHistory();
  const { recipeid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({
    title: '',
    ingredients: [''],
    steps: [''],
    size: '',
    intro: '',
    quote: '',
    images: [''],
    is_published: false,
    created: '',
    // duration: 0
    description: '',
    keywords: '',
    prep_time: 0,
    cook_time: 0,
    category: '',
    cook_method: '',
    cuisine: '',
  })
  
  useEffect(() => {
    if (recipeid) {
      fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${recipeid}`)
        .then((result) => result.json())
        .then((final) => {
          setRecipe(final.data);
        })
        .catch((err) => console.log("problem!"));
    }
   }, [recipeid])

   useEffect(() => {
     if (recipe !== null) {
      setIsUpdating(true);
      setData(data => ({ ...data, 
        title: recipe.title,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        size: recipe.size,
        intro: recipe.intro,
        quote: recipe.quote,
        images: recipe.images,
        // duration: recipe.duration,
        is_published: recipe.is_published,
        created: recipe.created,
        description: recipe.description,
        keywords: recipe.keywords,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        category: recipe.category,
        cook_method: recipe.cook_method,
        cuisine: recipe.cuisine
      }))
    }
   }, [recipe])
  
  useEffect(() => {
    if (isNew) {
      setData(data => ({
        title: '',
        ingredients: [''],
        steps: [''],
        size: '',
        intro: '',
        quote: '',
        images: [''],
        is_published: false,
        created: '',
        // duration: 0,
        description: '',
        keywords: '',
        prep_time: 0,
        cook_time: 0,
        category: '',
        cook_method: '',
        cuisine: '',
      }))
    }
    setIsUpdating(false);
  }, [isNew])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.name === 'is_published' ?
      e.target.checked : e.target.value;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': sessionStorage.getItem('token')
        },
        credentials: "include",
        body: JSON.stringify({
          title: data.title,
          ingredients: JSON.stringify(data.ingredients),
          steps: JSON.stringify(data.steps),
          size: data.size,
          intro: data.intro,
          quote: data.quote,
          images: JSON.stringify(data.images),
          is_published: data.is_published,
          // duration: data.duration,
          description: data.description,
          keywords: data.keywords,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          category: data.category,
          cook_method: data.cook_method,
          cuisine: data.cuisine
        }),
      }
    )
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        throw new Error("Network response was not okay uploading recipe");
      })
      .then((data) => {
        console.log('great');
        setRecipesLoaded(false);
        history.push(`/recipes`);
      })
      .catch((err) => console.log(err.message));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${recipeid}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          title: data.title,
          ingredients: JSON.stringify(data.ingredients),
          steps: JSON.stringify(data.steps),
          size: data.size,
          intro: data.intro,
          quote: data.quote,
          images: JSON.stringify(data.images),
          is_published: data.is_published,
          // duration: data.duration,
          description: data.description,
          keywords: data.keywords,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          category: data.category,
          cook_method: data.cook_method,
          cuisine: data.cuisine
        }),
      }
    )
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        throw new Error("Network response was not okay");
      })
      .then((data) => {
        setRecipesLoaded(false);
        history.push(`/recipes`);
      })
      .catch((err) => console.log(err.message));
  }

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    if (name === 'ingredient') {
      const values = [...data.ingredients];
      values[index] = value;
      setData({...data, ingredients: values});
    } 
    else if (name === 'step') {
      const values = [...data.steps];
      values[index] = value;
      setData({...data, steps: values});
    }
    else if (name === 'image') {
      const values = [...data.images];
      values[index] = value;
      setData({...data, images: values});
    }
  }

  const updateData = (type, values) => {
    switch (type) {
      case 'step':
        setData({...data, steps: values});
        break;
      case 'ingredient':
        setData({...data, ingredients: values});
        break;
      case 'image':
        setData({...data, images: values});
        break;
      default:
        return null;
    }
  }

  const handleMove = (e, index, type, direction) => {
    e.preventDefault();
    let values;
    switch (type) {
      case 'step':
        values = [...data.steps];
        break;
      case 'ingredient':
        values = [...data.ingredients];
        break;
      case 'image':
        values = [...data.images];
        break;
      default:
        return null;
    }

    const hold = values[index];
    if (direction === 'down' && index < values.length - 1) {
      values[index] = values[index + 1];
      values[index + 1] = hold;
      updateData(type, values);
    }
    else if (direction === 'up' && index > 0) {
      values[index] = values[index - 1];
      values[index - 1] = hold;
      updateData(type, values);
    }
  }

  const handleAddImage = (e) => {
    e.preventDefault();
    const values = [...data.images];
    values.push('');
    setData({ ...data, images: values });
  }

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const values = [...data.images];
    values.splice(index, 1);
    setData({ ...data, images: values });
  }

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const values = [...data.ingredients];
    values.push('');
    setData({...data, ingredients: values});
  }

  const handleRemoveIngredient = (e, index) => {
    e.preventDefault();
    const values = [...data.ingredients];
    values.splice(index, 1);
    setData({...data, ingredients: values});
  }

  const handleAddStep = (e) => {
    e.preventDefault();
    const values = [...data.steps];
    values.push('');
    setData({...data, steps: values});
  }

  const handleRemoveStep = (e, index) => {
    e.preventDefault();
    const values = [...data.steps];
    values.splice(index, 1);
    setData({...data, steps: values});
  }

  return (
    <>
      <RecipeFormComponent
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
        handleAddIngredient={handleAddIngredient}
        handleRemoveIngredient={handleRemoveIngredient}
        handleAddStep={handleAddStep}
        handleRemoveStep={handleRemoveStep}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
        handleMove={handleMove}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

export default RecipeFormContainer;


