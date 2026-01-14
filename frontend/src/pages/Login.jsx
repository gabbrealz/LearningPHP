import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormInput, PasswordInput } from "../components/FormInput";

export default function Login({ addToNotifs, authenticatedUser, setAuthenticatedUser }) {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login.php`, {
      method: "POST",
      body: new FormData(e.target),
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      addToNotifs({
        bgcolor: "bg-red-700",
        message: data.error
      });
      return;
    }
    
    setAuthenticatedUser(data.username);
    addToNotifs({
      bgcolor: "bg-green-700",
      message: data.message
    });
    setAuthChecked(true);
    navigate("/");
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
    <section className="w-full h-screen px-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-100 w-100 border-2 border-gray-400 rounded-xl px-12 py-6 flex flex-col items-center gap-2">
        <h2 className="text-xl mb-4">
          LOGIN
        </h2>
        <FormInput formName="login" inputName="username-or-email" label="Username / Email" type="text" value={name} setValue={setName} />
        <PasswordInput formName="login" inputName="password" label="Password" value={password} setValue={setPassword} />
        <div className="w-4/5 flex flex-col mt-6">
          <input type="submit" id="login-submit" value="Login" className="w-full text-white bg-green-700 mb-2 border py-1.5 rounded-md cursor-pointer hover:bg-green-600 transition-colors" />
          <span className="w-full text-center text-sm">
            Don't have an account? {" "}
            <Link to="/sign-up" className="whitespace-nowrap text-blue-900 hover:text-blue-600 hover:underline">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
}