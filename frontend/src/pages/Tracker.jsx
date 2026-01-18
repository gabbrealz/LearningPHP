import { useState, useEffect } from "react";

export default function Tracker() {
  return (
    <main className="w-full h-screen p-16 pt-17">
      <div className="pt-4 pb-2 text-2xl border-b-2 flex justify-between items-center">
        <span className="text-3xl">
          Track your expenses here
        </span>
        <UpdatingTime className="ml-4 font-mono" />
      </div>

    </main>
  )
}

function UpdatingTime({ className }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, [])

  return <time className={className}>{currentTime}</time>
}