import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts.jsx";

export default function Landing() {
  const {authenticatedUser} = useContext(AuthContext);

  return (
    <section className="w-full h-screen flex justify-center items-center bg-[url(../assets/background/landing-bg.svg)] bg-cover bg-center">
      <h1 className="flex flex-col items-center">
        {
          authenticatedUser ?
            <>
              <span className="text-6xl mb-6 whitespace-nowrap">
                Good day! Welcome back,
              </span>
              <span className="text-6xl underline underline-offset-10 text-indigo-900">
                {authenticatedUser}
              </span>
            </>
            :
            <>
              <span className="text-8xl mb-8 whitespace-nowrap">
                Hey there 😊
              </span>
              <span className="text-4xl text-center leading-normal">
                You're not logged in right now.<br/>
                Kindly {" "}
                <Link to="/login" className="whitespace-nowrap text-blue-900 hover:text-blue-500 transition-[color]">
                  Login
                </Link>
                {" "} or {" "}
                <Link to="/sign-up" className="whitespace-nowrap text-blue-900 hover:text-blue-500 transition-[color]">
                  Sign up
                </Link>!
              </span>
            </>
        }
      </h1>
    </section>
  );
}