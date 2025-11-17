import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEFAULT_PHONE_NUMBER = "+1 (310)-344-3833";

function toE164(candidate: string | undefined) {
  const digits = (candidate ?? "").replace(/[^0-9]/g, "");
  if (!digits) {
    return DEFAULT_PHONE_NUMBER;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (digits.length >= 10) {
    return `+1${digits.slice(-10)}`;
  }

  return DEFAULT_PHONE_NUMBER;
}

export function normalizeToE164(
  phoneInput?: string,
  fallbackNumber = DEFAULT_PHONE_NUMBER,
) {
  const fallbackNormalized = toE164(fallbackNumber);
  if (!phoneInput) {
    return fallbackNormalized;
  }

  const digits = phoneInput.replace(/[^0-9]/g, "");
  if (!digits) {
    return fallbackNormalized;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (digits.length >= 10) {
    return `+1${digits.slice(-10)}`;
  }

  return fallbackNormalized;
}

type PhoneNavigationOptions = {
  scheme: "tel" | "sms";
  phoneNumber: string;
  eventName?: string;
  phoneDisplay?: string;
  trackUrl?: string;
};

export function navigateToPhoneAction({
  scheme,
  phoneNumber,
  eventName,
  phoneDisplay,
  trackUrl = "/api/track",
}: PhoneNavigationOptions) {
  if (
    eventName &&
    typeof navigator !== "undefined" &&
    "sendBeacon" in navigator
  ) {
    try {
      navigator.sendBeacon(
        trackUrl,
        JSON.stringify({
          event: eventName,
          phone: phoneDisplay ?? phoneNumber,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      );
    } catch {
      // no-op
    }
  }

  if (typeof window !== "undefined") {
    window.location.href = `${scheme}:${phoneNumber}`;
  }
}
