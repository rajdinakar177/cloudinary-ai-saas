import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "MediaHub",
  description: "Image & Video Upload Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />

          <main className="min-h-screen">
            {children}
          </main>


          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}