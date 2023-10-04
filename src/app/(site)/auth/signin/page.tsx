import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "@/components/SignInButton";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { BsGoogle } from "react-icons/bs";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  const providers = await getProviders();
  console.log(providers);

  return (
    <div className="bg-slate-900 flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <SignInButton
            icon={provider.name === "Google" ? <BsGoogle className="text-red-500" /> : ""}
            provider={provider}
          />
        </div>
      ))}
    </div>
  );
}
