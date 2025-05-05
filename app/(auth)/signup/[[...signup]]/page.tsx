import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="flex flex-row justify-center">
      <SignUp oauthFlow="popup" signInUrl="/signin" />
    </div>
  );
};

export default SignUpPage;
