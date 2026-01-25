import { useState, createContext } from "react";

export const AuthContext = createContext();
export const ModalDataContext = createContext();
export const NotifContext = createContext();

export const InterfaceProvider = ({ children }) => {
  const [modalData, setModalData] = useState({ show: false });
  const [notifStack, setNotifStack] = useState([]);
  const addToNotifs = (notif) => {
    setNotifStack((prev) => {
      const newStack = [{...notif, id: crypto.randomUUID()}, ...prev];
      return newStack.splice(0, 5);
    });
  };

  return (
    <ModalDataContext.Provider value={{modalData, setModalData}}>
      <NotifContext.Provider value={{notifStack, addToNotifs, setNotifStack}}>
        {children}
      </NotifContext.Provider>
    </ModalDataContext.Provider>
  );
};