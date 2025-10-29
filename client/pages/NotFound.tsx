import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="container py-20">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-5xl font-extrabold mb-3">404</h1>
        <p className="text-lg text-muted-foreground mb-6">This page doesn't exist.</p>
        <a href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Go to homepage
        </a>
      </div>
    </section>
  );
};

export default NotFound;
