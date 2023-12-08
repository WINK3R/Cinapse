import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import React from "react";
import NavBar from "@/app/ui/components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
          <body>
              <NavBar></NavBar>
              <div className={`${inter.className} antialiased`}>{children}</div>
          </body>
      </html>
  );
}
