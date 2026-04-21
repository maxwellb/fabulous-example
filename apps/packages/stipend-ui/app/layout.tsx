import type { Metadata, Viewport } from "next";
import { Gelasio, Varta } from "next/font/google";
import "./globals.css";

const fontHeading = Varta({ subsets: ['latin'], variable: '--font-heading' });

const fontSerif = Gelasio({ subsets: ['latin'], variable: '--font-serif' });

const fontSans = Varta({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Fabulous Example!",
  description: "Submitted by Maxwell Bloch",
};

export const viewport: Viewport = {
  colorScheme: "light",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontSerif.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
