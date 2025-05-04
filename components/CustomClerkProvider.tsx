"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import type { PropsWithChildren } from "react";

const CustomClerkProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default CustomClerkProvider;
