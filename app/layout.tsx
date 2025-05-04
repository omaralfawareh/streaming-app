import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import ThemeButton from "@/components/ThemeButton";
import CustomClerkProvider from "@/components/CustomClerkProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streaming App",
  description: "", // TODO: Add proper metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <CustomClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <header className="flex justify-end items-center p-4 gap-6 h-16">
              <ThemeButton />
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="cursor-pointer">SignIn</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="cursor-pointer">SignUp</button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            {children}
          </body>
        </html>
      </CustomClerkProvider>
    </ThemeProvider>
  );
}
