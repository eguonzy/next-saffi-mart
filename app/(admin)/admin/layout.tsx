import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../../globals.css";
import { Sidebar } from "@/Components/Sidebar";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "mBlog Admin",
  description: "Admin section of mBlog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased flex`}>
        <Sidebar />

        <div className="flex-1"> {children}</div>
      </body>
    </html>
  );
}
