import React from "react";
import "@/app/globals.css";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-transparent text-gray-900">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="p-4 bg-gray-800 text-white text-center">
            Car Finder © {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}

