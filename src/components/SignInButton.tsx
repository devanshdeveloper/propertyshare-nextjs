"use client"

import { signIn } from "next-auth/react";

function SignInButton({provider , icon}) {
  return (
    <button className="bg-white px-6 py-3 rounded-lg flex gap-3 items-center" onClick={() => signIn(provider.id)}>
    {icon}  Sign in with {provider.name}
    </button>
  );
}

export default SignInButton;
