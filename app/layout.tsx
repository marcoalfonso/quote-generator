import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GradientBackgroundCon } from "./components/QuoteGenerator/QuoteGeneratorElements";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote Generator",
  description:
    "Quote Generator - NextJS, GraphQL, Node, Serverless, AWS, Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GradientBackgroundCon>
        <body className={inter.className}>{children}</body>
      </GradientBackgroundCon>
    </html>
  );
}
