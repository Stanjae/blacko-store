import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
import ScrollNavBar from "../components/ScrollNavBar";
import ReactQueryProvider from "../providers/reactQueryProvider";
import { auth } from "@/auth";


export default async function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <main className=" overflow-hidden relative">
        <NavBar session={session}/>
        <ScrollNavBar session={session}/>
        <Box py={'40px'} px={{sm:'40px', xs:'20px'}} bgcolor={'paper.main'} color={'secondary.main'}>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </Box>
        <Footer/>
    </main>
  );
}