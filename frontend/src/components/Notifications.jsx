import { useState, useEffect } from "react";
import CloseIcon from "../assets/interface-icons/cross.svg?react";

export default function Notifications({ notifStack, setNotifStack }) {
  return (
    <>
      {
        notifStack.map((notif, index) => 
          <Notification key={notif.id} notif={notif} index={index} setNotifStack={setNotifStack} />
        )
      }
    </>
  );
}

function Notification({ notif, index, setNotifStack }) {
  const [beginRemoval, setBeginRemoval] = useState(false);

  const closeNotif = () => {
    setBeginRemoval(true);
    setTimeout(() => setNotifStack(prev => prev.filter(entry => entry.id !== notif.id)), 250);
  };

  useEffect(() => {
    const timer = setTimeout(closeNotif, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`
      w-1/2 p-2.5 fixed top-4 left-1/2 -translate-x-1/2 text-sm text-white rounded-full shadow-xs shadow-black transition duration-250 animate-entry-slidedown
      ${beginRemoval ? "opacity-0" : ""}
      ${notif.bgcolor}
    `} style={{
      transform: `translateY(${index*6}px) scaleX(${1 - index*0.05})`,
      zIndex: 200-index
    }}>
      <div className="text-center">
        {notif.message}
      </div>
      <button className={`group absolute top-1/2 right-4 -translate-y-1/2 p-1.5 border-2 border-white rounded-full hover:bg-white transition-colors ${index === 0 ? "cursor-pointer" : ""}`}
            onClick={index !== 0 ? () => {} : closeNotif}>
        <CloseIcon className="size-2.5 fill-white group-hover:fill-black transition-colors"/>
      </button>

    </div>
  );
}