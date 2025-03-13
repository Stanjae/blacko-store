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
        <Grid2 gap={3} container>
            <Grid2 size={3}>
                <SideNavBar userId={session?.user?.id}/>
            </Grid2>
            <Grid2 size="grow">
                {children}
            </Grid2>
        </Grid2>
        
    </main>
  );
}