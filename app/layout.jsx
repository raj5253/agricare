import { Inter } from "next/font/google";
import "./globals.css";
// import { UserProvider } from "../context/userContext"
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Agricare",
  description: "Precise modern farming solution",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true} className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
