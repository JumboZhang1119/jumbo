// src/app/projects/[slug]/page.tsx
import { wisp } from "@/lib/wisp";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotographyProjects } from "@/lib/wisp";
import { getPhotoItemsByProjectTag } from "@/lib/photoItemApi";
import PhotoGrid from "./PhotoGrid.tsx";

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

    // 這裡先拿到所有照片，再過濾
    // 你也可以改成在 photoItemApi.ts 寫過濾函式，這邊直接呼叫
    const allPhotos = await getPhotoItemsByProjectTag();

    const projectTags = projectContent.tags || [];
    const matchingPhotos = allPhotos.filter((photo: any) => {
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
