import { Box } from "@mui/material";
import { NextAppProvider } from '@toolpad/core/nextjs'
import { Navigation } from "@toolpad/core/AppProvider";
import Image from "next/image";
import Logo from '../../../public/logo.png'
import { BarChart, Dashboard, Description, Layers, ShoppingCart } from "@mui/icons-material";

const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <Dashboard />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCart />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'reports',
      title: 'Reports',
      icon: <BarChart />,
      children: [
        {
          segment: 'sales',
          title: 'Sales',
          icon: <Description />,
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <Description />,
        },
      ],
    },
    {
      segment: 'integrations',
      title: 'Integrations',
      icon: <Layers />,
    },
  ];


export default async function ProtectedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Box bgcolor={'paper.main'} color={'secondary.main'}>
            <NextAppProvider navigation={NAVIGATION} branding={{
                    logo: <Image src={Logo} alt="logo" />,
                    title: 'Blacko Stores',
                    homeUrl: '/',
                }}>
            {children}
            </NextAppProvider>
        </Box>
    </main>
  );
}