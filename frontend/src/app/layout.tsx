import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Cards Against Humanity",
    template: "%s | Cards Against Humanity",
  },
  description:
    "A fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun!",
  metadataBase: new URL("https://cah-assignment-m5rh.vercel.app"),
  openGraph: {
    title: "Cards Against Humanity",
    description:
      "A fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun!",
    url: "https://cah-assignment-m5rh.vercel.app",
    siteName: "Cards Against Humanity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cards Against Humanity",
    description:
      "A fill-in-the-blank party game that turns your awkward personality and lackluster social skills into hours of fun!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <CartDrawer />
              {children}
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
