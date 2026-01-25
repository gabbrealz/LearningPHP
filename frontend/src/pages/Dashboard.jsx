import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, NotifContext } from "../Contexts.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const {authenticatedUser} = useContext(AuthContext);
  const {addToNotifs} = useContext(NotifContext);

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      let res, data;

      try {
        res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/get-all-users.php`, {
          method: "GET",
          credentials: "include"
        });

        data = await res.json();

        if (res.status == 401) {
          navigate("/");
        }
        else if (!res.ok) {
          addToNotifs({
            bgcolor: "bg-red-700",
            message: data.error
          });
        }
        else {
          setUserList(data);
        }
      }
      catch (error) {
        addToNotifs({
          bgcolor: "bg-red-700",
          message: "Sorry! We can't process your request right now."
        });
        console.error(error);
      }
    }

    fetchData();
    setLoading(false);
  }, []);

  return (
    <section className="px-8 pt-20 pb-8 w-full h-screen flex justify-center items-center">
      <div className="size-full px-12 py-4 bg-gray-100 border-2 border-gray-400 rounded-lg overflow-y-scroll flex flex-col gap-4">
        {
          authenticatedUser ?
            <div className="py-4 my-8 bg-white shadow-sm shadow-black rounded-md">
              <div className="w-9/10 text-center pb-2 mx-auto mb-4 border-b text-xl tracking-widest font-bold">
                YOU
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="flex justify-center items-center">
                  {authenticatedUser.name}
                </span>
                <span className="flex justify-center items-center">
                  {authenticatedUser.email}
                </span>
                <div className="flex justify-center items-center">
                  <span className={`
                    w-fit px-4 py-1 rounded-md text-white text-sm
                    ${authenticatedUser.role == "user" ? "bg-gray-800" : authenticatedUser.role == "employee" ? "bg-teal-700" : "bg-blue-500"}
                  `}>
                    {authenticatedUser.role}
                  </span>
                </div>
              </div>
            </div>
            : null
        }
        {
          userList.map((user, i) => {
            return (
              <div key={i} className="py-4 bg-white shadow-sm shadow-black rounded-md grid grid-cols-3 gap-4">
                <span className="flex justify-center items-center">
                  {user.name}
                </span>
                <span className="flex justify-center items-center">
                  {user.email}
                </span>
                <div className="flex justify-center items-center">
                  <span className={`
                    w-fit px-4 py-1 rounded-md text-white text-sm
                    ${user.role == "user" ? "bg-neutral-800" : user.role == "employee" ? "bg-teal-700" : "bg-blue-500"}
                  `}>
                    {user.role}
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  );
}