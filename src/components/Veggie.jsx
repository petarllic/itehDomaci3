import React, { useEffect, useState } from 'react';
import {Splide,SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Card, Gradient, Wrapper } from '../styled_components/MyList.styled';
import { Link } from 'react-router-dom';

function Veggie() {

  const [veggie,setVeggie] = useState([]);
  
  // with useEffect Hook we perform side effect in our component, after component is rendered
  // [] - “only run on mount, and clean up on unmount”.
  // mount - put element into DOM   
  useEffect(() =>{
    getVeggie(); 
  },[]);  

  const getVeggie = async () => {

    const check = localStorage.getItem('veggie');

    if(check){
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      const data = await api.json();

      // in local storage we can only save strings
      localStorage.setItem('veggie',JSON.stringify(data.recipes));

      setVeggie(data.recipes);
      console.log(data.recipes);
    }

    
  };

  
  return (
    <div>
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: 'free',
        gap: "5rem"
      }}>

      {veggie.map((recipe) =>{
        return(
          <SplideSlide key={recipe.id}>
          <Card>
            <Link to={'/recipe/'+recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title}/>
            <Gradient/>
            </Link>
          </Card>
          </SplideSlide>
        );
      })}
      </Splide>
    </Wrapper>
</div>
  )
}



export default Veggie