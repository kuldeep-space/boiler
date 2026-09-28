import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pandey Ji Iron Works | Steam Boiler Manufacturer & Pan-India Boiler Supplier",
  description: "Official B2B Portal of Pandey Ji Iron Works (Thanagazi, Rajasthan). Manufacturer of IBR 1950 Steam Boilers, Thermic Fluid Heaters, Water Softeners & Auxiliaries across India. Contact: 096804 29713.",
  keywords: "industrial boiler manufacturer, steam boiler India, IBR boiler, thermic fluid heater, Rajasthan boiler supplier",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen antialiased transition-colors duration-200"
        style={{ backgroundColor: '#eeebe3', color: '#171e19', fontFamily: "'Nunito', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
