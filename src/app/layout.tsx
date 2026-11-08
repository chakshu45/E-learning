import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GoogleProviderWrapper from "@/components/GoogleProviderWrapper";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "LearnWithSky - Full-Stack E-Learning Platform",
  description: "Experience a cinematic learning journey with world-class mentors and AI-powered paths.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans min-h-screen flex flex-col justify-between">
        <GoogleProviderWrapper>
          <AuthProvider>
            <Navbar />
            <main className="pt-16 min-h-screen flex-1">{children}</main>
            <Chatbot />
            <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
              <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
                <p>© {new Date().getFullYear()} LearnWithSky. All rights reserved.</p>
              </div>
            </footer>
          </AuthProvider>
        </GoogleProviderWrapper>
      </body>
    </html>
  );
}
