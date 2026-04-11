import { notFound } from "next/navigation";

import WorkDetailPageClient from "../../../components/WorkDetailPageClient";
import { getWorkDetailBySlug, workDetails } from "../works-data";

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
    title: detail.title,
    description: detail.summary,
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const detail = getWorkDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return <WorkDetailPageClient detail={detail} />;
}
