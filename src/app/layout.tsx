import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import React, {Suspense} from "react";
import NavBar from "@/app/ui/components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
          <body>
              <NavBar></NavBar>
              <div className={`${inter.className} antialiased`}><Suspense>{children}</Suspense></div>
          </body>
      </html>
  );
}
