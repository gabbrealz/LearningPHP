import { Link } from "react-router-dom";

export default function Landing({ authenticatedUser }) {
  return (
    <section className="w-full h-screen bg-[url(../assets/background/landing-bg.svg)] bg-cover bg-center">
      <div className="size-full bg-black/20 flex justify-center items-center">
        <h1 className="flex flex-col items-center">
          {
            authenticatedUser ?
              <>
                <span className="text-6xl mb-6 whitespace-nowrap">
                  Good day! Welcome back,
                </span>
                <span className="text-8xl underline underline-offset-10 text-indigo-900">
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
                  <Link to="/login" className="whitespace-nowrap text-blue-900 hover:text-blue-600 hover:underline">
                    Login
                  </Link>
                  {" "} or {" "}
                  <Link to="/sign-up" className="whitespace-nowrap text-blue-900 hover:text-blue-600 hover:underline">
                    Sign up
                  </Link>!
                </span>
              </>
          }
        </h1>
      </div>
    </section>
  );
}