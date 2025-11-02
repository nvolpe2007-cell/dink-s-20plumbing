import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookingBar from "@/components/ui/BookingBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground site-bg">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <BookingBar />
      <Footer />
    </div>
  );
}
