import { FormInput, PasswordInput } from "../components/FormInput.jsx";

export default function SignUp() {
  return (
    <section className="w-full h-screen px-4 flex justify-center items-center">
      <form className="bg-gray-100 w-100 border-2 border-gray-400 rounded-xl px-12 py-6 flex flex-col items-center gap-4">
        <h2 className="text-xl">
          SIGN UP
        </h2>
        <FormInput formName="signup" inputName="username" label="Username" type="text" />
        <FormInput formName="signup" inputName="email" label="Email" type="email" />
        <PasswordInput formName="signup" inputName="password" label="Password" />
        <PasswordInput formName="signup" inputName="confirm-password" label="Confirm Password" />
        <input type="submit" id="signup-submit" value="Sign Up"
               className="w-4/5 text-white bg-indigo-600 mt-4 py-1.5 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors" />
      </form>
    </section>
  );
}