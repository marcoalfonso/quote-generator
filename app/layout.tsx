import { useState, useEffect } from "react";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// AWS imports
import { Amplify } from "@aws-amplify/core";
import { generateClient } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api-graphql";
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
import { quoteQueryName, generateAQuote } from "@/src/graphql/queries";
import QuoteGeneratorModal from "./components/QuoteGenerator";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quote Generator",
  description:
    "Quote Generator - NextJS, GraphQL, Node, Serverless, AWS, Typescript",
};

Amplify.configure({ ...awsExports });

interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number;
    headers: { [key: string]: string };
    body: string;
  };
}

interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

function isGraphQLResultForquoteQueryName(
  response: any
): response is GraphQLResult<{
  quoteQueryName: {
    items: [UpdateQuoteInfoData];
  };
}> {
  return (
    response.data &&
    response.data.quoteQueryName &&
    response.data.quoteQueryName.items
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = generateClient();
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
  const [openGenerator, setOpenGenerator] = useState(false);
  const [processingQuote, setProcessingQuote] = useState(false);
  const [quoteReceived, setQuoteReceived] = useState<String | null>(null);

  const updateQuoteInfo = async () => {
    try {
      const response = await client.graphql<UpdateQuoteInfoData>({
        query: quoteQueryName,
        variables: {
          queryName: "LIVE",
        },
      });

      if (!isGraphQLResultForquoteQueryName(response)) {
        throw new Error("Unexpected response from graphQL");
      }

      if (!response.data) {
        throw new Error("Response data is undefined");
      }

      const receivedNumberOfQuotes =
        response.data.quoteQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);
    } catch (error) {
      console.log("error getting quote data", error);
    }
  };

  useEffect(() => {
    updateQuoteInfo();
  }, []);

  const handleCloseGenerator = () => {
    setOpenGenerator(false);
    setProcessingQuote(false);
    setQuoteReceived(null);
  };

  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenGenerator(true);
    setProcessingQuote(true);
    try {
      // Run Lambda Function
      const runFunction = "runFunction";
      const runFunctionStringified = JSON.stringify(runFunction);
      const response = await client.graphql<GenerateAQuoteData>({
        query: generateAQuote,
        variables: {
          input: runFunctionStringified,
        },
      });
      const responseStringified = JSON.stringify(response);
      const responseReStringified = JSON.stringify(responseStringified);
      const bodyIndex = responseReStringified.indexOf("body=") + 5;
      const bodyAndBase64 = responseReStringified.substring(bodyIndex);
      const bodyArray = bodyAndBase64.split(",");
      const body = bodyArray[0];
      console.log(body);
      setQuoteReceived(body);

      // End state:
      setProcessingQuote(false);

      // Fetch if any new quotes were generated from counter
      updateQuoteInfo();

      // setProcessingQuote(false);
      // setTimeout(() => {
      //   setProcessingQuote(false);
      // }, 3000);
    } catch (error) {
      console.log("error generating quote:", error);
      setProcessingQuote(false);
    }
  };

  return (
    <html lang="en">
      <GradientBackgroundCon>
        <body className={inter.className}>{children}</body>
      </GradientBackgroundCon>
      <QuoteGeneratorModal
        open={openGenerator}
        close={handleCloseGenerator}
        processingQuote={processingQuote}
        setProcessingQuote={setProcessingQuote}
        quoteReceived={quoteReceived}
        setQuoteReceived={setQuoteReceived}
      />
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
          <GenerateQuoteButton onClick={handleOpenGenerator}>
            <GenerateQuoteButtonText>Make a Quote</GenerateQuoteButtonText>
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
