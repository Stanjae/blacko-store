import { Container, Stack } from "@mui/material";
import CustomLogo from "../components/CustomLogo";
import type { Metadata } from "next";
import Link from "next/link";
import { ColorToogle } from "../components/ColorToogle";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login to Blacko Eccomerce Store",
  description: "Shopping Services",
};


export default async function AuthPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (session) {
    return redirect('/')
  }
  return (
    <main className="relative">
      <div className="absolute">
        <ColorToogle/>
      </div>
      
        <Container maxWidth="xl" className="  justify-center flex items-center h-dvh">
            <div className=" w-full max-w-[400px] space-y-4">
                <Stack direction={'row'} justifyContent={'center'}><Link href={'/'}><CustomLogo/></Link></Stack>
                {children}
            </div>
            
        </Container>   
    </main>
  );
}