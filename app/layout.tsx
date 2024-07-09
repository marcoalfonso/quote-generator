import { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// AWS imports
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import {
  BackgroundImage1,
  BackgroundImage2,
  FooterCon,
  FooterLink,
  GenerateQuoteButton,
  GenerateQuoteButtonText,
  GradientBackgroundCon,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
  RedSpan,
} from "./components/QuoteGenerator/QuoteGeneratorElements";
import Clouds1 from "./assets/cloud-and-thunder.png";
import Clouds2 from "./assets/cloudy-weather.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote Generator",
  description:
    "Quote Generator - NextJS, GraphQL, Node, Serverless, AWS, Typescript",
};

Amplify.configure({ ...awsExports, ssr: true });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [numberOfQuotes, setNumberOfQuotes] = useState(0);
  return (
    <html lang="en">
      <GradientBackgroundCon>
        <body className={inter.className}>{children}</body>
      </GradientBackgroundCon>
      {/* <QuoteGeneratorModal
      /> */}
      <QuoteGeneratorCon>
        <QuoteGeneratorInnerCon>
          <QuoteGeneratorTitle>Daily Inspiration Generator</QuoteGeneratorTitle>
          <QuoteGeneratorSubTitle>
            Looking for a splash of inspiration? Generate a quote card with a
            random inspiration quote provided by{" "}
            <FooterLink
              href="https://zenquotes.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ZenQuotes API
            </FooterLink>
            .
          </QuoteGeneratorSubTitle>
          <GenerateQuoteButton>
            <GenerateQuoteButtonText onClick={null}>
              Make a Quote
            </GenerateQuoteButtonText>
          </GenerateQuoteButton>
        </QuoteGeneratorInnerCon>
      </QuoteGeneratorCon>
      <BackgroundImage1 src={Clouds1} height="300" alt="cloudybackground1" />
      <BackgroundImage2 src={Clouds2} height="300" alt="cloudybackground2" />
      <FooterCon>
        <>
          Quotes Generated: {numberOfQuotes}
          <br />
          Developed with <RedSpan>♡</RedSpan> by{" "}
          <FooterLink
            href="https://marcolavielle.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marco Lavielle
          </FooterLink>
        </>
      </FooterCon>
    </html>
  );
}
