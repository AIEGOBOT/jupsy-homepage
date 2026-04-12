import { workDetails } from "./works/works-data";
import { getSiteUrl } from "../lib/siteMetadata";

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const staticRoutes = ["", "/about"];
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
  const workEntries = workDetails.map((detail) => ({
    url: `${siteUrl}/works/${detail.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...workEntries];
}
