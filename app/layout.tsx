import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Encephalon Learning Platform | Volunteer Training",
  description: "Sacred preparation for Dr. Joe Dispenza retreat volunteers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen sacred-bg">
          {/* Header */}
          <header className="border-b border-primary-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🦋</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-primary-900">
                      Encephalon Learning
                    </h1>
                    <p className="text-sm text-gray-600">
                      Volunteer Preparation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="page-transition">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-primary-100 mt-20 py-8 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
              <p className="italic">
                "When we give from the heart, we're in alignment with the divine. 
                And in that state, we become more of who we truly are."
              </p>
              <p className="mt-2 text-primary-700 font-medium">
                — Dr. Joe Dispenza
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
