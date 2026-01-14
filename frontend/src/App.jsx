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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifStack, setNotifStack] = useState([]);
  const [modalData, setModalData] = useState({ show: false });
  const addToNotifs = (notif) => setNotifStack([{...notif, id: crypto.randomUUID()}, ...notifStack]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user.php`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setIsAuthenticated(data))
    .catch(error => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <Header addToNotifs={addToNotifs} setModalData={setModalData} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Notifications notifStack={notifStack} setNotifStack={setNotifStack} />
      <ModalDialog data={modalData} />

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login addToNotifs={addToNotifs} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<SignUp addToNotifs={addToNotifs} isAuthenticated={isAuthenticated} />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}