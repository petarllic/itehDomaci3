import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {Splide,SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Card, Gradient, Wrapper } from '../styled_components/MyList.styled';

function Popular() {

  const [popular,setPopular] = useState([]);

  // with useEffect Hook we perform side effect in our component, after component is rendered
  // [] - “only run on mount, and clean up on unmount”.
  // mount - put element into DOM   
  useEffect(() =>{
    getPopular(); 
  },[]);  

  
  const getPopular = async () => {
    const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await api.json();
    setPopular(data.recipes);
    console.log(data.recipes);

    const check = localStorage.getItem('popular');

    if(check){
      setPopular(JSON.parse(check));
    }else{
      const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await api.json();

      // in local storage we can only save strings
      localStorage.setItem('popular',JSON.stringify(data.recipes));

      setPopular(data.recipes);
      console.log(data.recipes);
    }


  };

  return (
    <div>
      {popular.map((recipe) => {
        return (
          <Wrapper>
            <h3>Popular Picks</h3>
            {popular.map((recipe) =>{
              return(
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}/>
                </Card>
              );
            })}
          </Wrapper>
        )
      })}
    </div>
  )
}

const Wrapper = styled.div`
  margin:4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
`
