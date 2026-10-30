import type { APIRoute, GetStaticPaths } from "astro";
import { editions, type Edition } from "../../data/editions";

export const getStaticPaths: GetStaticPaths = () =>
  editions.filter((e) => e.start && e.end).map((e) => ({ params: { slug: e.slug }, props: { e } }));

const stamp = (d: string, t: string) => `${d.replace(/-/g, "")}T${t.replace(":", "")}00`;
const esc = (s: string) => s.replace(/[,;\\]/g, (m) => "\\" + m);

export const GET: APIRoute = ({ props, site }) => {
  const e = (props as { e: Edition }).e;
  const url = new URL(`/editions/${e.slug}/`, site).href;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rajkamal Prakashan//Kitab Utsav//HI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@kitabutsav`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")}`,
    `DTSTART;TZID=Asia/Kolkata:${stamp(e.start!, e.startTime ?? "10:00")}`,
    `DTEND;TZID=Asia/Kolkata:${stamp(e.end!, e.endTime ?? "20:00")}`,
    `SUMMARY:${esc(`किताब उत्सव ${e.city.hi} | Kitab Utsav ${e.city.en} ${e.year}`)}`,
    `LOCATION:${esc(e.venue?.en ?? e.city.en)}`,
    `DESCRIPTION:${esc(e.summary.hi + " " + url)}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Response(lines.join("\r\n"), { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
};
