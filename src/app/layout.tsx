import type { Metadata } from "next";
import { Inter, Lora, Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import { ThemeProvider } from "./providers";
import { Toaster } from "@/components/ui/toaster";
const inter = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Glamora",
  description:
    "Discover your beauty essentials at Glamora. Shop high-quality cosmetics and skincare products with confidence. Join our community for exclusive offers and expert advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
