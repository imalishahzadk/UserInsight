"use client";
// app/layout.tsx or _app.tsx
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// import { useEffect } from 'react';


        
// Client component - no Metadata
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
import StoreProvider from "@/providers/store-provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  // useEffect(() => {
  //   AOS.init({
  //     once: false, 
  //     duration: 1200,
  //   });
  // }, []);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeRegistry>
          <StoreProvider>
            <QueryProvider>{children}</QueryProvider>
            <Toaster position="top-center" reverseOrder={false} />
          </StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
