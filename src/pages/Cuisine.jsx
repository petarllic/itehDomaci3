import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import {Link,useParams} from 'react-router-dom';
import { CardCuisine, Grid } from '../styled_components/MyList.styled';

function Cuisine() {

  const [cuisine,setCuisine] = useState([]);
  let params = useParams();

  const getCuisine =  async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(()=>{
    getCuisine(params.type);
  },[params.type]); // whenever params.type changes, run this useEffect function

  return (
    <Grid>
      {cuisine.map((item) => {
        return(
          <CardCuisine key={item.id}>
            <img src={item.image} alt=""/>
            <h4>{item.title}</h4>
          </CardCuisine>
        )
      })}
    </Grid>
  )
}

export default Cuisine