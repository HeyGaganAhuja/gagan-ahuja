
import "../index.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gagan Consults',
  description: 'Accelerating Growth With Websites',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
