// src/app/projects/[slug]/page.tsx
import { wisp } from "@/lib/wisp";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotographyProjects } from "@/lib/wisp";
import { getPhotoItemsByProjectTag } from "@/lib/photoItemApi";
import PhotoGrid from "./PhotoGrid";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const result = await getPhotographyProjects();
  if (!result || !result.contents) return [];
  return result.contents.map((project) => ({ slug: project.slug }));
}


export default async function ProjectDetailPage(context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;
  const slug = params.slug;

  try {
    const { content } = await wisp.getContent({
      contentTypeSlug: "photographyProject",
      contentSlug: slug,
    });
    const projectContent = content.content;
    // 先拿到專案的 tags
    const projectTags = projectContent.tags || [];

    // 針對每個 tag 呼叫 API 拿對應的照片
    const photosByTags = await Promise.all(
      projectTags.map((tag: string) => getPhotoItemsByProjectTag(tag))
    );

    // 合併陣列
    const allPhotos = photosByTags.flat();

    // 用 Map 以 photo.id 去重複（比 title 更好）
    const uniquePhotos = Array.from(
      new Map(allPhotos.map(p => [p.id, p])).values()
    );

    // 再篩選符合 projectTags 中任一 tag 的照片（理論上 API 已過濾，這裡是保險）
    const matchingPhotos = uniquePhotos.filter((photo: any) => {
      const tags = photo.content.tags || [];
      return tags.some((t: string) => projectTags.includes(t));
    });

    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-10">
          {projectContent.coverImage && (
            <div className="w-full h-96 relative rounded-2xl overflow-hidden">
              <Image
                src={projectContent.coverImage}
                alt={projectContent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end p-6">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
                    {projectContent.title}
                  </h1>
                  <p className="max-w-xl text-sm opacity-90">
                    {projectContent.description || "No description."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 這裡用 Client Component */}
        <PhotoGrid photos={matchingPhotos} />

      </main>
    );
  } catch (err) {
    console.error("Error loading project detail:", err);
    return notFound();
  }
}
