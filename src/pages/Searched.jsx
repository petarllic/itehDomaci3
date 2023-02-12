import React from 'react';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardCuisine, Grid } from '../styled_components/MyList.styled';

function Searched() {

    const [searchedRecipes,setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched =  async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };    

    useEffect(()=>{
        getSearched(params.search);
    },[params.search]) // activate function every time search changes

    return (
        <Grid>
            {searchedRecipes.map((item) => {
                return(
                    <CardCuisine key={item.id}>
                        <img src={item.image} alt=""/>
                        <h4>{item.title}</h4>
                    </CardCuisine>
                )
            })}
        </Grid>
    );
}

export default Searched;