const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-8 grid gap-3 sm:grid-cols-3 items-center text-sm">
        <div className="font-semibold">
          © {new Date().getFullYear()} Dink's Plumbing
        </div>
        <div className="text-muted-foreground">
          Fast fixes for leaks, clogs, and heaters. Licensed & Insured.
        </div>
        <div className="sm:justify-self-end flex gap-4">
          {OWNER_PHONE ? (
            <a className="hover:underline" href={`tel:${OWNER_PHONE}`}>
              {OWNER_PHONE}
            </a>
          ) : null}
          {OWNER_EMAIL ? (
            <a className="hover:underline" href={`mailto:${OWNER_EMAIL}`}>
              {OWNER_EMAIL}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
