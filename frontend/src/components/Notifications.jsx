import CloseIcon from "../assets/interface-icons/cross.svg?react";

export default function Notifications({ notifStack, setNotifStack }) {
  return (
    <>
      {
        notifStack.map((notif, index) => {
          return (
            <div key={notif.id} className={`
              w-1/2 fixed top-4 left-1/2 -translate-x-1/2 rounded-full
              p-2.5 text-sm text-white transition
              ${notif.bgcolor}
            `} style={{
              transform: `translateY(${index*6}px) scaleX(${1 - index*0.05})`,
              zIndex: notifStack.length-index,
              filter: `brightness(${1 - index*0.2})`
            }}>
              <div className="text-center select-none">
                {notif.message}
              </div>
              <span className={`group absolute top-1/2 right-4 -translate-y-1/2 p-1.5 border-2 border-white rounded-full hover:bg-white transition-colors ${index === 0 ? "cursor-pointer" : ""}`}
                    onClick={index !== 0 ? () => {} : () => setNotifStack(notifStack.filter((entry) => entry.id !== notif.id))}>
                <CloseIcon className="size-2.5 fill-white group-hover:fill-black transition-colors"/>
              </span>

            </div>
          )
        })
      }
    </>
  );
}