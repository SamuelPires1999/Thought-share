"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-teal-400 px-10 py-1 rounded-md text-zinc-800 hover:bg-teal-600"
    >
      Login
    </button>
  );
}
