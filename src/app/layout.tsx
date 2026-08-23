import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DomainIQ — AI Domain Name Valuator",
  description:
    "Get AI-powered domain name valuations with detailed market analysis, comparable sales, and improvement suggestions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#ededed] min-h-screen">
        {children}
              <script src="https://slopads-mlx.vercel.app/api/promo.js" defer></script>
      </body>
    </html>
  );
}
