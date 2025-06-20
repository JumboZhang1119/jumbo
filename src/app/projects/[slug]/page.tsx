// src/app/projects/[slug]/page.tsx
import { wisp } from "@/lib/wisp";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotographyProjects } from "@/lib/wisp";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const result = await getPhotographyProjects();

  if (!result || !result.contents) {
    return [];
  }

  return result.contents.map((project) => ({ slug: project.slug }));
}

type PhotographyProjectContent = {
  title: string;
  coverImage?: string;
  description?: string;
  // 其他欄位...
};

export default async function ProjectDetailPage(context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;
  const slug = params.slug;
  console.log("awaitedParams:", slug);

  try {
    const { content } = await wisp.getContent({
      contentTypeSlug: "photographyProject",
      contentSlug: slug,
    }) as { content: PhotographyProjectContent };

    return (
      <main className="container mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
        {content.coverImage ? (
          <Image
            src={content.coverImage}
            alt={content.title}
            width={1200}
            height={800}
            className="rounded-lg"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Image Available
          </div>
        )}
        <div className="mt-4 prose">{content.description || "No description."}</div>
      </main>
    );
  } catch (err) {
    console.error("Error loading project detail:", err);
    return notFound();
  }
}
