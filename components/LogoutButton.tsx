"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-teal-400 px-10 py-1 rounded-md text-zinc-800 hover:bg-teal-600"
    >
      Logout
    </button>
  );
}
