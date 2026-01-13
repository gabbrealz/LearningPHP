export default function Notifications({ notifStack, setNotifStack }) {
  return (
    <>
      {
        notifStack.map((notif, index) => {
          const scale = 1 - index * 0.05;
          
          return (
            <div key={notif.id} className={`
              w-1/2 fixed top-8 left-1/2 -translate-x-1/2
              p-4 text-sm text-white transition-transform
              ${notif.bgcolor}
            `} style={{ transform: `translateY(${index*4}px) scale(${scale})` }}>
              
              {notif.message}
              <span className="absolute top-1/2 right-4 -translate-y-1/2 p-2 cursor-pointer"
                    onClick={() => setNotifStack(notifStack.filter((entry) => entry !== notif.id))}>
                🗙
              </span>

            </div>
          )
        })
      }
    </>
  );
}