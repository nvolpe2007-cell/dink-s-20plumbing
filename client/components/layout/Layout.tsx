import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookingBar from "@/components/ui/BookingBar";

export default function Layout() {
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID as string | undefined;
    if (!id) return;
    if ((window as any).gtagLoaded) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}', { 'anonymize_ip': true });`;
    document.head.appendChild(inline);
    (window as any).gtagLoaded = true;
  }, []);

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
