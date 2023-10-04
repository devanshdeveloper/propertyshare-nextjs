"use client";

import { SessionProvider } from "next-auth/react";

export default function ContextProviders({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
