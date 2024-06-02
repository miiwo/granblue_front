import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/nav";
import { GBFWeaponGridContextProvider } from "./calc/gbfcalcContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skyfaring Domains",
  description: "Generated by create next app",
  icons: {
    icon: ['/grancypher/favicon.ico?v=4'],
    apple: ['/grancypher/apple-touch-icon.png?v=4'],
    shortcut: ['/grancypher/apple-touch-icon.png'],
  },
  manifest: '/grancypher/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          <GBFWeaponGridContextProvider>
            {children}
          </GBFWeaponGridContextProvider>
      </body>
    </html>
  );
}
