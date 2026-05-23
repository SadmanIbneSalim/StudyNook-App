import {  Roboto } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});



export const metadata = {
  title: "StudyNook | Find Quiet Study Rooms Near You",
  description: " Book peaceful and private study rooms for focused learning. Explore modern library spaces with Wi-Fi, whiteboards, air conditioning, and flexible hourly booking. ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.className}  h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
  <Navbar />

  <main className="flex-1">
    {children}
  </main>

  <Footer />
  <ToastContainer />
</body>
    </html>
  );
}
