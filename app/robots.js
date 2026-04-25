import { getSiteUrl, toAbsoluteUrl } from "../lib/siteMetadata";

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: toAbsoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
