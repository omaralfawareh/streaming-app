"use client";
import { signInAction } from "@/actions/auth";
import { useActionState } from "react";

const SignIn = () => {
  const [state, formAction, isPending] = useActionState(signInAction, false);

  if (isPending) {
    return (
      <div className="border h-screen flex flex-col justify-center items-center">
        <div>...Loading</div>
      </div>
    );
  }
  return (
    <div className="border h-screen flex flex-col justify-center items-center">
      {/* <h1>SignIn</h1> */}
      {!state && (
        <form className="flex flex-col w-1/2" action={formAction}>
          <input
            className="border m-2 p-1 pl-2"
            type="text"
            placeholder="username"
            name="email"
            autoComplete="email"
          />
          <input
            className="border m-2 p-1 pl-2"
            type="password"
            placeholder="password"
            name="password"
          />
          <button type="submit" className="border m-2 p-1 pl-2 cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
