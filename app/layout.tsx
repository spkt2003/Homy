import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar"; // ✅ เรียกใช้ที่นี่

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homy - Trusted Home Services",
  description: "House cleaning, pet care, and plant care while you are away.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* ✅ ใส่ไว้ที่นี่เพื่อให้แสดงผลทุกหน้า */}
        <main className="min-h-screen bg-gray-50 text-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}