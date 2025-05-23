import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <SignIn oauthFlow="popup" signUpUrl="/signup" />
    </div>
  );
};

export default SignInPage;
