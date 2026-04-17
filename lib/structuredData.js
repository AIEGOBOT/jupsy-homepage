import {
  contactEmail,
  defaultOgImage,
  siteAltName,
  siteDescription,
  siteName,
  socialProfiles,
  toAbsoluteUrl,
} from "./siteMetadata";

function toAbsoluteAssetUrl(pathname) {
  if (!pathname) {
    return toAbsoluteUrl(defaultOgImage);
  }

  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }

  return toAbsoluteUrl(pathname);
}

function createOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": toAbsoluteUrl("/#organization"),
    name: siteAltName,
    alternateName: [siteName, "JUPSY STUDIO"],
    url: toAbsoluteUrl("/"),
    email: contactEmail,
    description: siteDescription,
    sameAs: socialProfiles,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        availableLanguage: ["ko-KR", "en"],
      },
    ],
  };
}

function createWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": toAbsoluteUrl("/#website"),
    url: toAbsoluteUrl("/"),
    name: siteName,
    alternateName: siteAltName,
    description: siteDescription,
    inLanguage: ["ko-KR", "en"],
    publisher: {
      "@id": toAbsoluteUrl("/#organization"),
    },
  };
}

function createBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

function createHomePageStructuredData(items) {
  const detailItems = items.filter((item) => item.detailSlug);

  return [
    createOrganizationStructuredData(),
    createWebsiteStructuredData(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": toAbsoluteUrl("/#webpage"),
      url: toAbsoluteUrl("/"),
      name: `${siteName} 홈`,
      description: siteDescription,
      inLanguage: "ko-KR",
      isPartOf: {
        "@id": toAbsoluteUrl("/#website"),
      },
      about: [
        "AI image production",
        "AI video production",
        "detail page design",
        "campaign key visual",
        "product visual production",
      ],
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(defaultOgImage),
      },
      publisher: {
        "@id": toAbsoluteUrl("/#organization"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": toAbsoluteUrl("/#featured-works"),
      name: "JUPSY 대표 포트폴리오",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: detailItems.length,
      itemListElement: detailItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: toAbsoluteUrl(`/works/${item.detailSlug}`),
      })),
    },
  ];
}

function createAboutPageStructuredData() {
  return [
    createBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": toAbsoluteUrl("/about#webpage"),
      url: toAbsoluteUrl("/about"),
      name: `${siteName} About`,
      description:
        "JUPSY의 AI 이미지 제작, AI 영상 제작, 상세페이지 제작 워크플로우와 팀 구성을 소개하는 페이지입니다.",
      inLanguage: "ko-KR",
      about: {
        "@id": toAbsoluteUrl("/#organization"),
      },
      isPartOf: {
        "@id": toAbsoluteUrl("/#website"),
      },
    },
  ];
}

function createWorkPageStructuredData(detail) {
  const pagePath = `/works/${detail.slug}`;
  const imageUrl = toAbsoluteAssetUrl(detail.coverImage || detail.imageSrc || defaultOgImage);

  return [
    createBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Works", path: "/" },
      { name: detail.title, path: pagePath },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": toAbsoluteUrl(`${pagePath}#creativework`),
      url: toAbsoluteUrl(pagePath),
      name: detail.title,
      headline: detail.title,
      description: detail.summary,
      image: [imageUrl],
      thumbnailUrl: imageUrl,
      genre: detail.typeLabel,
      creator: {
        "@id": toAbsoluteUrl("/#organization"),
      },
      publisher: {
        "@id": toAbsoluteUrl("/#organization"),
      },
      inLanguage: "ko-KR",
      isPartOf: {
        "@id": toAbsoluteUrl("/#website"),
      },
    },
  ];
}

export {
  createAboutPageStructuredData,
  createBreadcrumbStructuredData,
  createHomePageStructuredData,
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  createWorkPageStructuredData,
};
