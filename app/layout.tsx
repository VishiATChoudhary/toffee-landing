import type { Metadata } from "next";
import "@fontsource/abeezee/400.css";
import "@fontsource/abeezee/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toffee — E-commerce AI Agent Optimization",
  description:
    "Toffee helps e-commerce brands optimize their storefronts for AI shopping agents. Analyze, learn, and increase revenue.",
  openGraph: {
    title: "Toffee — E-commerce AI Agent Optimization",
    description:
      "Optimize your e-commerce storefront for the AI agent era.",
    type: "website",
  },
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
