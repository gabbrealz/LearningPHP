import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useId, use } from "react";
import { AuthContext, NotifContext } from "../Contexts.jsx";
import { FormInput, PasswordInput } from "../components/FormInput.jsx";
import LoadingIcon from "../assets/interface-icons/loading.svg?react";

export default function Login() {
  const navigate = useNavigate();
  const {authenticatedUser, setAuthenticatedUser} = useContext(AuthContext);
  const {addToNotifs} = useContext(NotifContext);

  const [loading, setLoading] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassword("");
    
    let res;
    let data;

    try {
      res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login.php`, {
        method: "POST",
        body: new FormData(e.target),
        credentials: "include"
      });

      data = await res.json();

      if (res.status === 403) {
        location.reload();
      }
      else if (!res.ok) {
        addToNotifs({
          bgcolor: "bg-red-700",
          message: data.error
        });
      }
      else {
        setAuthenticatedUser(data.user);
        addToNotifs({
          bgcolor: "bg-green-700",
          message: data.message
        });
        setAuthChecked(true);
        navigate("/");
      }

    }
    catch (error) {
      addToNotifs({
        bgcolor: "bg-red-700",
        message: "Sorry! We can't process your request right now."
      });
      console.error(error);
    }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (authChecked) setAuthChecked(false);
    else if (authenticatedUser) {
      addToNotifs({
        bgcolor: "bg-red-700",
        message: "You are already logged in."
      });
      navigate("/");
    }
  }, [authenticatedUser]);

  return (
    <section className="w-full h-screen bg-[url(../assets/background/login-bg.svg)] bg-cover bg-center">
      <div className="size-full px-4 bg-black/20 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-100 w-100 border-2 border-gray-400 rounded-xl px-12 py-6 flex flex-col items-center gap-2">
          <h2 className="text-xl mb-4 tracking-widest">
            LOGIN
          </h2>
          <FormInput inputName="email" label="Email" type="email" value={email} setValue={setEmail} />
          <PasswordInput inputName="password" label="Password" value={password} setValue={setPassword} />
          <RememberMe />
          <div className="w-4/5 flex flex-col mt-6">
            { loading ? (
                <div className="w-full h-10 bg-green-600 mb-2 rounded-md flex justify-center items-center">
                  <LoadingIcon className="size-6 animate-spin fill-white" />
                </div>
              )
              :
              <input type="submit" id="login-submit" value="Login" className="w-full h-10 text-white bg-green-700 mb-2 py-1.5 rounded-md cursor-pointer hover:bg-green-600 transition-colors" />
            }
            <span className="w-full text-center text-sm">
              Don't have an account? {" "}
              <Link to="/sign-up" className="whitespace-nowrap text-blue-900 hover:text-blue-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

function RememberMe() {
  const id = useId();

  return (
    <span className="self-start flex items-center">
      <input type="checkbox" id={id} name="remember-me" value="yes" className="mr-2 size-4" />
      <label className="text-sm" htmlFor={`${id}`}>
        Remember Me
      </label>
    </span>
  )
}