import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext, NotifContext } from "../Contexts.jsx";
import { FormInput, PasswordInput } from "../components/FormInput.jsx";
import LoadingIcon from "../assets/interface-icons/loading.svg?react";

const usernamePattern = /^[A-Za-z0-9_]+$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function SignUp() {
  const navigate = useNavigate();
  const {authenticatedUser} = useContext(AuthContext);
  const {addToNotifs} = useContext(NotifContext);

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [nameWarning, setNameWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [password, setPassword] = useState("");
  const [passWarning, setPassWarning] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassWarning, setConfirmPassWarning] = useState(false);

  const changeUsername = (newValue) => { if (newValue.length <= 20) setUsername(newValue); };
  const changePassword = (newValue) => { if (newValue.length <= 64) setPassword(newValue); };
  const changeConfirmPassword = (newValue) => { if (newValue.length <= 64) setConfirmPassword(newValue); };

  useEffect(() => setNameWarning(username.length > 0 && !usernamePattern.test(username)), [username]);

  useEffect(() => setEmailWarning(email.length > 0 && !emailPattern.test(email)), [email]);

  useEffect(() => {
    let showWarning = false;
    if (password.length > 0 && (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)))
      showWarning = true;

    setPassWarning(showWarning);
  }, [password]);

  useEffect(() => {
    let showWarning = false;
    if ((password.length !== 0 || confirmPassword.length !== 0) && password !== confirmPassword)
      showWarning = true;

    setConfirmPassWarning(showWarning);
  }, [password, confirmPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUsername(""); setEmail("");
    setPassword(""); setConfirmPassword("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup.php`, {
        method: "POST",
        body: new FormData(e.target),
        credentials: "include"
      });
      const data = await res.json();
  
      if (res.ok) {
        addToNotifs({
          bgcolor: "bg-green-700",
          message: data.message
        });
        navigate("/login");
      }
      else if (res.status === 403) {
        location.reload();
      }
      else {
        addToNotifs({
          bgcolor: "bg-red-700",
          message: data.error
        });
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
    if (authenticatedUser) {
      addToNotifs({
        bgcolor: "bg-red-700",
        message: "You are already logged in."
      });
      navigate("/");
    }
  }, [authenticatedUser]);

  return (
    <section className="w-full h-screen bg-[url(../assets/background/signup-bg.svg)] bg-cover bg-center">
      <div className="size-full px-4 bg-black/20 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-100 w-100 border-2 border-gray-400 rounded-xl px-12 py-6 flex flex-col items-center gap-2">
          <h2 className="text-xl mb-4 tracking-widest">
            SIGN UP
          </h2>
          <FormInput inputName="username" label="Username" type="text" value={username} setValue={changeUsername}
                    showWarning={nameWarning} warningMessage="Username cannot have symbols or spaces." />
          <FormInput inputName="email" label="Email" type="email" value={email} setValue={setEmail}
                    showWarning={emailWarning} warningMessage="Email is invalid." />
          <PasswordInput inputName="password" label="Password" value={password} setValue={changePassword}
                        showWarning={passWarning} warningMessage="Password must have at least 8 characters, 1 digit, and 1 upper-case letter." />
          <PasswordInput inputName="confirm-password" label="Confirm Password" value={confirmPassword} setValue={changeConfirmPassword}
                        showWarning={confirmPassWarning} warningMessage="Passwords do not match." />

          <div className="w-4/5 flex flex-col mt-6">
            { loading ? (
                <div className="w-full h-10 bg-indigo-500 mb-2 rounded-md flex justify-center items-center">
                  <LoadingIcon className="size-6 animate-spin fill-white" />
                </div>
              )
              :
              <input type="submit" id="signup-submit" value="Sign Up" disabled={nameWarning || emailWarning || passWarning || confirmPassWarning}
                     className="w-full h-10 text-white bg-indigo-600 mx-auto mb-2 py-1.5 rounded-md cursor-pointer disabled:cursor-auto disabled:bg-indigo-400 hover:bg-indigo-500 transition-colors" />
            }
            <span className="w-full mx-auto text-center text-sm">
              Already have an account? {" "}
              <Link to="/login" className="whitespace-nowrap text-blue-900 hover:text-blue-600 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}