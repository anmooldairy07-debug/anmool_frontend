import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MilkLoader from "@/components/MilkLoader";
import ComingSoon from "@/components/ComingSoon";
import { COMING_SOON } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: { default: "Anmool Dairy — Pure Products. Honest Promise.", template: "%s | Anmool Dairy" },
  description: "Bringing Genuine Products to Your Family — With Purity, Care & Trust. Milk, Pure Desi Ghee, Cow Dung Ash, Cow Dung Cakes & upcoming DhenuVera incense from Karnal, Haryana.",
  keywords: ["anmool dairy", "karnal", "haryana", "desi ghee", "milk", "cow dung ash", "cow dung cakes", "dhenuvera", "dhoop", "sambrani cups", "pure products"],
  openGraph: {
    title: "Anmool Dairy — Pure Products. Honest Promise.",
    description: "From local milk supply in Karnal to Pure Desi Ghee across India & DhenuVera incense — Genuine Products, Honest Efforts, Happy Customers.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Frontend-only gate: if COMING_SOON is true, show ComingSoon for ALL routes
  if (COMING_SOON) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="antialiased">
          <ComingSoon />
        </body>
      </html>
    );
  }

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
