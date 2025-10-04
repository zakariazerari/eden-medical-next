import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HeaderFooterWrapper from "./components/HeaderFooterWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://edenmedical.com'),
  title: {
    default: "Eden Medical Transport - Safe Medical Rides in California",
    template: "%s | Eden Medical Transport"
  },
  description: "Professional non-emergency medical transportation across California. Wheelchair accessible, stretcher service, dialysis transport. Available 24/7. Licensed & insured.",
  keywords: ["medical transport California", "non-emergency transportation", "wheelchair van service", "dialysis transport", "medical rides", "Eden Transport"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edenmedical.com',
    title: 'Eden Medical Transport - Safe Medical Rides in California',
    description: 'Professional non-emergency medical transportation across California',
    siteName: 'Eden Medical Transport',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Toaster position="top-center" />
        <div id="main-content">
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        </div>
      </body>
    </html>
  );
}