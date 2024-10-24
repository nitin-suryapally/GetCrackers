import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProductProvider } from "@/context/ProductContext";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Get Crackers",
  description:
    "Light up your celebrations with our premium range of crackers! From sparklers to rockets, explore our wide variety of festive fireworks for every occasion. Quality products at great prices. Celebrate safely!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hidden`}
      >
        <ProductProvider>
          <div className="hidden sm:block">
            <Navbar />
          </div>
          <div className="block sm:hidden">
            <MobileNavbar />
          </div>
          <main>{children}</main>
        </ProductProvider>
        <Footer />
      </body>
    </html>
  );
}
