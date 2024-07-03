import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const [owners, setOwners] = useState([])
  const [dogs, setDogs] = useState([])
  const ownerList = useSelector((state) => state.owner.value);

console.log('ownerList', ownerList)
  useEffect(() => {
    axios.get('/api/owners')
      // .then(response => response.json())
      .then(data => {
        setOwners(data.owners)
        console.log('owner response',data);
      });
  }, []);



  return (
    <>
      Hello For Now
  
    </>
  )
}

export default App
