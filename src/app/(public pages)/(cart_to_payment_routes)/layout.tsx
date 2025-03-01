import CustomStepper from "@/app/components/CustomStepper";
import { Box } from "@mui/material";



export default async function CartPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
       <CustomStepper/>
        <Box py={'40px'} bgcolor={'paper.main'} color={'secondary.main'}>
            {children}
        </Box>
    </main>
  );
}