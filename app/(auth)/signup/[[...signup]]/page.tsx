import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen border items-center justify-center  ">
      <SignUp oauthFlow="popup" signInUrl="/signin" />
    </div>
  );
};

export default SignUpPage;
