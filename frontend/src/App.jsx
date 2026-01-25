import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { InterfaceProvider, AuthContext } from './Contexts.jsx';
import Header from './components/Header.jsx';
import Notifications from './components/Notifications.jsx';
import ModalDialog from './components/ModalDialog.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import './assets/styles.css';


export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/get-authenticated-user.php`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) setAuthenticatedUser(data.user);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <HashRouter>
      <AuthContext.Provider value={{authenticatedUser, setAuthenticatedUser}}>
      <InterfaceProvider>
        <Header />
        <Notifications />
        <ModalDialog />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </InterfaceProvider>
      </AuthContext.Provider>
    </HashRouter>
  )
}