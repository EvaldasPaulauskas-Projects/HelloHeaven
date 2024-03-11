import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import icon from "../../public/icons/favicon-32x32.png"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hello Heaven E-Shop",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/icons/favicon-32x32.png" />
      </head>
      <body>
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
