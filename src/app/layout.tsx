import type { Metadata } from "next";
import { Exo_2, Montserrat } from "next/font/google";

import "swiper/css";
import "./globals.scss";

import AppLayout from "@components/layouts/app-layout";
import QueryProvider from "@components/providers/QueryProvider";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo2"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "dfluid",
  description: "dfluid assignment"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${exo2.variable} ${montserrat.variable}`}>
        <QueryProvider>
          <AppLayout>{children}</AppLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
