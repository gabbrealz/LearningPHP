import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="w-full h-screen px-4 flex justify-center items-center">
      <form className="bg-slate-100 w-100 border-2 rounded-xl px-12 py-6 flex flex-col items-center gap-4">
        <h2 className="text-xl">
          LOGIN
        </h2>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm" for="login-email">Email</label>
          <input type="email" id="login-email" className="bg-white text-sm border px-2 py-1 rounded-md" required/>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm" for="login-password">Password</label>
          <span className="w-full">
            <input type="password" id="login-password" className="w-full bg-white text-sm border px-2 py-1 rounded-md" required/>
          </span>
        </div>
        <div className="w-4/5 flex flex-col mt-4">
          <input type="submit" id="login-submit" value="Login" className="w-full text-white bg-black mb-2 border py-1 rounded-md cursor-pointer hover:scale-105 transition-[scale]" />
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