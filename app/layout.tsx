import type { Metadata } from "next";
import "./globals.css";
import { Amplify } from "@aws-amplify/core";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports });

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
      <body>{children}</body>
    </html>
  );
}
