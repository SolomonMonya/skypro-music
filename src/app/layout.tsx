import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ReduxProvider from "./utilities/store/ReduxProvider";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ReduxProvider>
        <body className={montserrat.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}