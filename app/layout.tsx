import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider, { type Theme } from "@/providers/ThemeProvider";
import { UserButton } from "@clerk/nextjs";
import { cookies } from "next/headers";
import ThemeButton from "@/components/ThemeButton";
import CustomClerkProvider from "@/components/CustomClerkProvider";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  const userTheme = (await cookies()).get("theme")?.value as Theme;

  return (
    <ThemeProvider userTheme={userTheme}>
      <CustomClerkProvider>
        <html lang="en" className={`${userTheme || "dark"}`}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <header className="flex justify-between items-center p-4 gap-6 h-16 absolute border-b w-full z-10">
              <div className="flex gap-4">
                <Link href="/">Logo</Link>
                {userId && <Link href="/stream">Stream</Link>}
              </div>
              <div className="flex gap-4">
                <ThemeButton />
                {!userId ? (
                  <div className="flex flex-row gap-2">
                    <Link href="/signin">
                      <Button className="cursor-pointer">SignIn</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="min-w-[150px]">
                    <UserButton
                      showName
                      signInUrl="/signin"
                      fallback={
                        <div className="flex flex-row gap-2 justify-center items-center">
                          <Skeleton className="w-[100px] h-[18px] rounded-full" />
                          <Skeleton className="h-[28px] w-[28px] rounded-full" />
                        </div>
                      }
                    />
                  </div>
                )}
              </div>
            </header>
            <div className="flex flex-col pt-16 h-screen font-[family-name:var(--font-geist-sans)]">
              {children}
            </div>
          </body>
        </html>
      </CustomClerkProvider>
    </ThemeProvider>
  );
}
