import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const outfit = Outfit({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-outfit'
})

export const metadata: Metadata = {
  title: "Skyfaring Domains",
  description: "A GBF fan website with utilities to help play the game",
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
      <body className={`${inter.className} ${outfit.className}`}>
        <Navbar />  
        {children}
        <Footer />
      </body>
    </html>
  );
}
