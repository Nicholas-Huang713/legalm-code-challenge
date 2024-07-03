import { useState, useEffect } from 'react'
import './App.css'
import {useSelector, useDispatch} from 'react-redux';
import { fetchOwners } from './state/slices/owner/ownerSlice';

function App() {
  const dispatch = useDispatch();
  const [owners, setOwners] = useState([])
  const [dogs, setDogs] = useState([])
  const ownerList = useSelector((state) => state.owner.owners);

  useEffect(() => {
    dispatch(fetchOwners());
    
  }, []);

  return (
    <>
    <header>
      <h1>Dog Adoption</h1>
    </header>

    <ul>
     {ownerList.length > 0 ? 
        ownerList.map((owner) => (
        <li key={owner.id}>{owner.name}</li>
        ))
      : null
      }
    </ul>
    </>
    
  )
}

export default App;
