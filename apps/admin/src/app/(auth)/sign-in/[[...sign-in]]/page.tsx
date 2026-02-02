import { SignIn } from "@clerk/nextjs";

export default function Page() {
  console.log("sign in");
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
