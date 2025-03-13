import SideNavBar from "@/app/components/customer/SideNavBar";
import { auth } from "@/auth";
import { Grid2 } from "@mui/material";
import { redirect } from "next/navigation";



export default async function CustomerPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     const session = await auth()
      if (!session) {
        return redirect('/')
      }
  return (
    <main>
        <Grid2 spacing={{xs:3}} container>
            <Grid2 size={{md:3, xs:12}}>
                <SideNavBar userId={session?.user?.id}/>
            </Grid2>
            <Grid2 size="grow">
                {children}
            </Grid2>
        </Grid2>
        
    </main>
  );
}