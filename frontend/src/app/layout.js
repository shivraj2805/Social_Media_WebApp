import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthWrapper from "./auth-wrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Facebook",
  description: "Making Clone Of Facebook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <Toaster />
        <ThemeProvider attribute="class">
         <AuthWrapper>
            {children}
         </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
