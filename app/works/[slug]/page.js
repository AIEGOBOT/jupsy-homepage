import { notFound } from "next/navigation";

import JsonLdScript from "../../../components/JsonLdScript";
import WorkDetailPageClient from "../../../components/WorkDetailPageClient";
import { createWorkPageStructuredData } from "../../../lib/structuredData";
import { getWorkDetailBySlug, workDetails } from "../works-data";
import { defaultKeywords, defaultOgImage, siteName } from "../../../lib/siteMetadata";

export async function generateStaticParams() {
  return workDetails.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = getWorkDetailBySlug(slug);

  if (!detail) {
    return {
      title: "Work",
    };
  }

  return {
    title: `${detail.title} 포트폴리오`,
    description: detail.summary,
    alternates: {
      canonical: `/works/${slug}`,
    },
    keywords: [...defaultKeywords, detail.title, detail.typeLabel, "portfolio"],
    openGraph: {
      type: "article",
      title: `${detail.title} | ${siteName}`,
      description: detail.summary,
      url: `/works/${slug}`,
      images: [
        {
          url: detail.coverImage || detail.imageSrc || defaultOgImage,
          alt: detail.coverAlt || detail.imageAlt || detail.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${detail.title} | ${siteName}`,
      description: detail.summary,
      images: [detail.coverImage || detail.imageSrc || defaultOgImage],
    },
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const detail = getWorkDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  const structuredData = createWorkPageStructuredData(detail);

  return (
    <>
      {structuredData.map((entry, index) => (
        <JsonLdScript key={index} data={entry} />
      ))}
      <WorkDetailPageClient detail={detail} />
    </>
  );
}
