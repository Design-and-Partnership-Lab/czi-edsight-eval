import type { Metadata } from "next";

import "./globals.css";

import { cx } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={cx(
                        `${GeistSans.variable} ${GeistMono.variable}`,
                        "antialiased",
                        "bg-neutral-50 dark:bg-neutral-900"
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
