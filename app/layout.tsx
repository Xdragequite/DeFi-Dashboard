import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarDeFi from "@/components/SidebarDeFi";
import StoreProvider from "../store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Charts",
  description: "News,charts,and more about crypto world",
};
// перед тем как добавлять на сайдбар че то нужно сюда энпоинты писать
const sidebarData: [string, string][] = [
  ['/binance', 'Binance'],
  ['/bybit', 'Bybit'],
  ['/huobi', 'Huobi'],
  ['/mexc', 'MEXC'],
  ['/okx', 'OKX']
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full w-full flex bg-zinc-950 text-white">
        <StoreProvider>
          <SidebarDeFi endpoints={sidebarData}></SidebarDeFi>
          <main className="flex-1 w-full min-w-0 mt-10 overflow-y-auto transition-all duration-300 pl-0 mt-15 ml-5 flex justify-start lg:justify-center font-geist">
            {children}
          </main>
        </StoreProvider>
      </body>

    </html>
  );
}
