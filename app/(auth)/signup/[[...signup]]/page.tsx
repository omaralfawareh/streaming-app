import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center  ">
      <SignUp oauthFlow="popup" signInUrl="/signin" />
    </div>
  );
};

export default SignUpPage;
