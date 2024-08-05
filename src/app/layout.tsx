import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ReduxProvider from "./utilities/store/ReduxProvider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Skypro-music - лучший сервис музыки для души",
  description: "Skypro-music - сервис для бесплатного прослушивания музыки",
};

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