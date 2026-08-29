import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MilkLoader from "@/components/MilkLoader";

export const metadata: Metadata = {
  title: { default: "Anmool Dairy — Premium Farm Fresh Dairy Products", template: "%s | Anmool Dairy" },
  description: "Premium farm-fresh dairy products delivered to your doorstep. Pure milk, paneer, ghee, and more — 58 years of tradition.",
  keywords: ["dairy", "milk", "paneer", "ghee", "fresh", "farm", "anmool", "gujarat", "organic", "premium"],
  openGraph: {
    title: "Anmool Dairy — Premium Farm Fresh Dairy Products",
    description: "Premium farm-fresh dairy products delivered to your doorstep.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <MilkLoader />
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
