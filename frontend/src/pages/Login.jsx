export default function Login() {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <form className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <label for="login-email">Email</label>
          <input type="email" id="login-email"/>
        </div>
        <div>
          <label for="login-password">Password</label>
          <input type="password" id="login-password"/>
        </div>
      </form>
    </section>
  );
}