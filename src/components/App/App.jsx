import { useState } from 'react';

import css from './App.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectorsAuth';

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector(selectUser);
  console.log('user: ', user);

  return <>App</>;
}

export default App;
