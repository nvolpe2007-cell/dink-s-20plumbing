import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Droplets, ShieldCheck, Wrench } from "lucide-react";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL as string | undefined;
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL as string | undefined;
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;

export default function Index() {
  const hasCalendar = typeof CALENDAR_URL === "string" && CALENDAR_URL.length > 0;
  const hasEmail = typeof OWNER_EMAIL === "string" && OWNER_EMAIL.length > 0;
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white dark:from-sidebar dark:to-background">
      <section className="container grid lg:grid-cols-2 gap-10 py-14 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Licensed • Insured • Local
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Plumbing fixed today.
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            Leaks? Clogs? No hot water? We show up fast and get it done right. Simple pricing. Zero hassle.
          </p>
          <div className="flex flex-wrap gap-3">
            {hasCalendar ? (
              <Button asChild size="lg" className="px-6">
                <a href={CALENDAR_URL} target="_blank" rel="noreferrer">
                  <Clock className="h-4 w-4" /> Book in our calendar
                </a>
              </Button>
            ) : null}
            {hasEmail ? (
              <Button asChild variant="secondary" size="lg" className="px-6">
                <a href={`mailto:${OWNER_EMAIL}?subject=I%20need%20a%20plumber&body=Hi%20BlueDrop%20Plumbing%2C%0A%0AName%3A%20%0AAddress%3A%20%0AProblem%3A%20%0APreferred%20time%3A%20%0A%0AThanks!`}>
                  Email us to book
                </a>
              </Button>
            ) : null}
            {hasPhone ? (
              <Button asChild variant="outline" size="lg" className="px-6">
                <a href={`tel:${OWNER_PHONE}`}>Call now</a>
              </Button>
            ) : null}
          </div>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Leaks</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Clogs</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Water heaters</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Toilets</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Faucets</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Burst pipes</li>
          </ul>
        </div>
        <div className="relative isolate">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
          <div className="rounded-3xl border bg-card p-6 shadow">
            <div className="flex items-center gap-3 pb-5 border-b">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Droplets className="h-5 w-5" />
              </span>
              <div>
                <div className="font-bold">BlueDrop Promise</div>
                <div className="text-xs text-muted-foreground">No-nonsense plumbing</div>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3"><Wrench className="mt-0.5 h-4 w-4 text-primary" /> Same-day service, on time</li>
              <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" /> Upfront pricing, guaranteed</li>
              <li className="flex items-start gap-3"><Droplets className="mt-0.5 h-4 w-4 text-primary" /> Clean workspace, zero mess</li>
            </ul>
            {(hasCalendar || hasEmail || hasPhone) ? (
              <div className="mt-6 grid gap-2">
                {hasCalendar ? (
                  <Button asChild className="w-full">
                    <a href={CALENDAR_URL} target="_blank" rel="noreferrer">Book now</a>
                  </Button>
                ) : null}
                {hasEmail ? (
                  <Button asChild variant="secondary" className="w-full">
                    <a href={`mailto:${OWNER_EMAIL}?subject=Booking%20request%20-%20BlueDrop%20Plumbing`}>Email to book</a>
                  </Button>
                ) : null}
                {hasPhone ? (
                  <Button asChild variant="outline" className="w-full">
                    <a href={`tel:${OWNER_PHONE}`}>Call us</a>
                  </Button>
                ) : null}
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">Add VITE_CALENDAR_URL or VITE_OWNER_EMAIL to enable one‑click booking.</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container py-10 grid sm:grid-cols-3 gap-6 text-center">
          <Stat icon={<Clock className="h-5 w-5" />} label="Response" value="Under 60 min" />
          <Stat icon={<ShieldCheck className="h-5 w-5" />} label="Warranty" value="1 year" />
          <Stat icon={<Droplets className="h-5 w-5" />} label="Happy homeowners" value="Thousands" />
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-2">
      <div className="mx-auto inline-flex items-center justify-center rounded-md bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
