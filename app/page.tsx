"use client";

import Image from "next/image";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";
import { chain } from "./chain";
import { inAppWallet } from "thirdweb/wallets";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="flex flex-col items-center justify-center"
          src="/DProjectLogo_650x600.svg"
          alt="DProjectLogo_650x600.svg"
          width={180}
          height={38}
          priority
        />        
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            ระบบจัดการหลังบ้าน{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              DProject
            </code>
            .
          </li>
          <li>เครื่องมือช่วยจัดการระบบ</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/check-user"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            ข้อมูลผู้ใช้
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/check-referee"
            target="_blank"
            rel="noopener noreferrer"
          >
            ข้อมูลสายงาน
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://polygonscan.com/token/0x2a61627c3457ccea35482cadec698c7360ffb9f2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/logo-polygon.png"
            alt="Polygon Icon"
            width={34}
            height={30}
          />
          3K NFT Explorer
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://opensea.io/assets/matic/0x2a61627c3457ccea35482cadec698c7360ffb9f2/0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/logo-opensea.svg"
            alt="Opensea Icon"
            width={32}
            height={32}
          />
          Opensea Assets
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/logo-vercel_500x120.png"
            alt="Vercel Icon"
            width={125}
            height={30}
          />
          Vercel Templates
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/next.svg"
            alt="Next Icon"
            width={100}
            height={25}
          />
          Nextjs.org →
        </a>
      </footer>
    </div>
  );
}
