import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "ticktock — Timesheet Management | Tentwenty",
  description: "Cutting-edge timesheet web application designed to track employee work hours.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
