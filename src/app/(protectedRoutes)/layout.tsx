import { Box } from "@mui/material";
import React from "react";


export default async function ProtectedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Box bgcolor={'paper.main'} color={'secondary.main'}>
            {children}
        </Box>
    </main>
  );
}