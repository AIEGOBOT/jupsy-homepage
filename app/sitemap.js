import { workDetails } from "./works/works-data";
import { toAbsoluteUrl } from "../lib/siteMetadata";

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ["", "/about"];
  const staticEntries = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(route || "/"),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
  const workEntries = workDetails.map((detail) => ({
    url: toAbsoluteUrl(`/works/${detail.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...workEntries];
}
