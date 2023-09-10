import { FormEvent, useRef, useState } from "react";

import { login } from "@api/auth";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState(false);

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const enteredEmail = emailRef.current?.value;
      const enteredPassword = passwordRef.current?.value;

      if (enteredEmail && enteredPassword) {
        await login({
          email: enteredEmail,
          password: enteredPassword,
        });
        setIsLogin(true);
      }
    } catch (err) {
      setIsLogin(false);
      console.error(err);
    }
  };
  return (
    <>
      <p>
        loginStatus :{" "}
        <span style={{ color: `${isLogin ? "green" : "red"}` }}>
          {isLogin ? "success" : "fail"}
        </span>
      </p>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="text"
            placeholder="enter your email"
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            placeholder="enter your password"
            ref={passwordRef}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default LoginPage;
