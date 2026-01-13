import { useState, useEffect } from "react";
import { FormInput, PasswordInput } from "../components/FormInput.jsx";

const usernamePattern = /^[A-Za-z0-9_]+$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function SignUp() {
  const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [username, setUsername] = useState("");
  const [nameWarning, setNameWarning] = useState(false);
  useEffect(() => setNameWarning(username.length > 0 && !usernamePattern.test(username)), [username]);

  const [email, setEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  useEffect(() => setEmailWarning(email.length > 0 && !emailPattern.test(email)), [email]);

  const [password, setPassword] = useState("");
  const [passWarning, setPassWarning] = useState(false);
  useEffect(() => {
    let showWarning = false;
    if (password.length > 0 && (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)))
      showWarning = true;

    setPassWarning(showWarning);
  }, [password]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassWarning, setConfirmPassWarning] = useState(false);
  useEffect(() => {
    let showWarning = false;
    if ((password.length !== 0 || confirmPassword.length !== 0) && password !== confirmPassword)
      showWarning = true;

    setConfirmPassWarning(showWarning);
  }, [password, confirmPassword]);


  return (
    <section className="w-full h-screen px-4 flex justify-center items-center">
      <form className="bg-gray-100 w-100 border-2 border-gray-400 rounded-xl px-12 py-6 flex flex-col items-center gap-2">
        <h2 className="text-xl mb-4">
          SIGN UP
        </h2>
        <FormInput formName="signup" inputName="username" label="Username" type="text" value={username} setValue={setUsername}
                   showWarning={nameWarning} warningMessage="Username cannot contain symbols." />
        <FormInput formName="signup" inputName="email" label="Email" type="email" value={email} setValue={setEmail}
                   showWarning={emailWarning} warningMessage="Email is invalid." />
        <PasswordInput formName="signup" inputName="password" label="Password" value={password} setValue={setPassword}
                       showWarning={passWarning} warningMessage="Password must have at least 8 characters, 1 digit, and 1 upper-case letter." />
        <PasswordInput formName="signup" inputName="confirm-password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword}
                       showWarning={confirmPassWarning} warningMessage="Passwords do not match." />
        <input type="submit" id="signup-submit" value="Sign Up" disabled={nameWarning || emailWarning || passWarning || confirmPassWarning}
               className="w-4/5 text-white bg-indigo-600 mt-6 py-1.5 rounded-md cursor-pointer disabled:cursor-auto disabled:bg-indigo-400 hover:bg-indigo-500 transition-colors" />
      </form>
    </section>
  );
}