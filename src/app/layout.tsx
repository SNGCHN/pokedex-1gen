import { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex - 1st Generation",
  description: "Next.js로 만든 1세대 포켓몬 도감!",
  icons: {
    icon: "/favicon.png",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <header className="bg-red-500 text-white p-9">
          <div className="flex justify-center">
            <Image src="/Pokedex_logo.png" alt="Pokédex - 1st Generation" width={150} height={100}></Image>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Pokédex</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
