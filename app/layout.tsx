import Navbar from "@/components/Navbar";
import AuthContext from "@/app/auth/AuthContext";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "@/components/Toaster";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-zinc-800 text-slate-300 text-lg container mx-auto max-w-3xl flex flex-col items-center">
        <QueryProvider>
          <AuthContext>
            <Navbar />
            <Toaster />
            {children}
          </AuthContext>
        </QueryProvider>
      </body>
    </html>
  );
}
