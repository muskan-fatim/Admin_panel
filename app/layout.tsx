import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Admin_panel",
  description: "Admin panel for managing orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
