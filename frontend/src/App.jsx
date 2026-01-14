import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Notifications from './components/Notifications.jsx';
import ModalDialog from './components/ModalDialog.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';
import './assets/styles.css';


export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const [notifStack, setNotifStack] = useState([]);
  const [modalData, setModalData] = useState({ show: false });
  const addToNotifs = (notif) => {
    let newNotifStack = [{...notif, id: crypto.randomUUID()}, ...notifStack];
    newNotifStack.splice(5);
    setNotifStack(newNotifStack);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/get-authenticated-user.php`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) setAuthenticatedUser(data.username);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <Header addToNotifs={addToNotifs} setModalData={setModalData} authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />

      <Notifications notifStack={notifStack} setNotifStack={setNotifStack} />
      <ModalDialog data={modalData} />

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login addToNotifs={addToNotifs} authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} />} />
        <Route path="/sign-up" element={<SignUp addToNotifs={addToNotifs} authenticatedUser={authenticatedUser} />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}