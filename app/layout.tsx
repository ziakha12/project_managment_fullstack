import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, DM_Sans, Nunito } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "Kaamora",
  description: "Modern project management SaaS",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${nunito.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
