export default function SignUp() {
  return (
    <section className="w-full h-screen px-4 flex justify-center items-center">
      <form className="bg-slate-100 w-100 border-2 rounded-xl px-12 py-6 flex flex-col items-center gap-4">
        <h2 className="text-xl">
          SIGN UP
        </h2>
        <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" for="signup-name">Username</label>
            <input type="text" id="signup-name" className="bg-white text-sm border px-2 py-1 rounded-md" required/>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm" for="signup-email">Email</label>
          <input type="email" id="signup-email" className="bg-white text-sm border px-2 py-1 rounded-md" required/>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm" for="signup-password">Password</label>
          <span>
            <input type="password" id="signup-password" className="w-full bg-white text-sm border px-2 py-1 rounded-md" required/>
          </span>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm" for="signup-confirm-password">Confirm Password</label>
          <span className="w-full">
            <input type="password" id="signup-confirm-password" className="w-full bg-white text-sm border px-2 py-1 rounded-md" required/>
          </span>
        </div>
        <input type="submit" id="signup-submit" value="Sign Up" className="w-4/5 text-white bg-black mt-4 border py-1 rounded-md cursor-pointer hover:scale-105 transition-[scale]" />
      </form>
    </section>
  );
}