import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StrategyVault - Strategic Opportunity Management",
  description: "Enterprise-grade DNSO (Discover New Service Opportunities) management platform. McKinsey/BCG-inspired strategic planning tools for executives and consultants.",
  icons: {
    icon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAGAAwAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////////////////////////////////////////////////2gjv2gjv2gjv2gjv2gjv////////////////////////////////////2gjv2gjv2gjv2gjv2gjv2gjv2gjv2gjuKOh7///////////////////////+KOh72gjv2gjv2gjv2gjv2gjv2gjv2gjv2gjuKOh6KOh7///////////////+KOh6KOh72gjv2gjv2gjv2gjv2gjv2gjv2gjv2gjuKOh6KOh6KOh7///////////+KOh6KOh72gjv2gjv2gjv2gjv2gjv2gjv2gjv2gjuKOh6KOh6KOh7///////+KOh6KOh78+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+viKOh6KOh6KOh7///+KOh6KOh78+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+viKOh6KOh6KOh7///+KOh6KOh78+vj8+vjw6OLw6OLw6OLw6OLw6OLw6OL8+vj8+viKOh6KOh6KOh7///+KOh6KOh78+vj8+vjw6OLw6OLw6OLw6OLw6OLw6OL8+vj8+viKOh6KOh6KOh7///+KOh6KOh78+vj8+vjw6OLw6OLw6OLw6OLw6OLw6OL8+vj8+viKOh6KOh6KOh7///////+KOh78+vj8+vjw6OLw6OLw6OLw6OLw6OLw6OL8+vj8+viKOh6KOh7///////////+KOh78+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+viKOh6KOh7////////////////8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+vj8+viKOh7///////////////////////+KOh6KOh6KOh6KOh6KOh6KOh6KOh6KOh6KOh7///////////////////////////////////+KOh6KOh6KOh6KOh6KOh7///////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
