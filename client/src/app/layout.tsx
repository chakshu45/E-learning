import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/context/AuthContext";
import GoogleProviderWrapper from "@/components/GoogleProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnWithSky | Premium E-Learning Platform",
  description: "Master new skills with the world's best instructors. Scalable, interactive, and modern education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleProviderWrapper>
          <AuthProvider>
            <Navbar />
            <main className="pt-16 min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Chatbot />
          </AuthProvider>
        </GoogleProviderWrapper>
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} LearnWithSky. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
