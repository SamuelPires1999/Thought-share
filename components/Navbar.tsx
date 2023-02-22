import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex justify-between items-center py-4">
      <Link href={"/"}>
        <div className="flex gap-2 text-2xl">
          <span className="first-letter:font-bold">Thought</span>
          <span className="first-letter:font-bold">Share</span>
        </div>
      </Link>

      {session?.user ? (
        <div>
          Hello, {session.user.name} | <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
