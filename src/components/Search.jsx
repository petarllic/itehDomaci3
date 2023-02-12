import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { FormStyle } from '../styled_components/MyList.styled';
import { useNavigate } from 'react-router-dom';

function Search() {

  const[input, setInput] = useState(""); 
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };


  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
        <FaSearch/>
        <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </div>
    </FormStyle>
    )
}

export default Search