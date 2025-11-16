import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+1 (310)-344-3833";
const phoneNumber = normalizeToE164(phoneDisplay);
const callHref = `tel:${phoneNumber}`;
const textHref = `sms:${phoneNumber}`;

export default function BookingBar() {
  return null;
}
