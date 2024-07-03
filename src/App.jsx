import { useEffect } from 'react'
import './App.scss'
import { useDispatch } from 'react-redux';
import { fetchOwners } from './state/slices/owner/ownerSlice';
import OwnerList from './pages/OwnerList/OwnerList';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchOwners());
    
  }, []);

  return (
    <div>
      <header>
        <h1>Dog Adoption</h1>
      </header>
      <OwnerList />

    </div>
    
  )
}

export default App;
