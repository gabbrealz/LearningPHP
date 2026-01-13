import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Notifications from './components/Notifications.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';
import './assets/styles.css';


export default function App() {
  const [notifStack, setNotifStack] = useState([]);
  const addToNotifs = (notif) => setNotifStack([...notifStack, {...notif, id: crypto.randomUUID()}]);

  return (
    <BrowserRouter>
      <Header/>
      <Notifications notifStack={notifStack} setNotifStack={setNotifStack} />

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login addToNotifs={addToNotifs} />} />
        <Route path="/sign-up" element={<SignUp addToNotifs={addToNotifs} />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}