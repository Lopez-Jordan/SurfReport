import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { createContext, useState } from 'react';

export const LogInContext = createContext();



export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <LogInContext.Provider value={[loggedIn, setLoggedIn]}>
        <Navbar />
        <Outlet />
      </LogInContext.Provider>
    </>
  )
}





