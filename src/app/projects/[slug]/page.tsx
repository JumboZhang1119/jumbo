import { wisp } from "@/lib/wisp";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPhotographyProjects } from "@/lib/wisp";
import { getPhotoItemsByProjectTag } from "@/lib/photoItemApi";
import PhotoGrid from "./PhotoGrid";
import FloatingNavbar from "./FloatingNavbar";
import Link from "next/link";
import CoverSlider from './CoverSlider';
import ScrollableNav from './ScrollableNav';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const result = await getPhotographyProjects();
  if (!result || !result.contents) return [];
  return result.contents.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage(context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;
  const slug = params.slug;

  try {
    const allProjects = await getPhotographyProjects();
    if (!allProjects || !allProjects.contents) return notFound();

    const { content } = await wisp.getContent({
      contentTypeSlug: "photographyProject",
      contentSlug: slug,
    });
    const projectContent = content.content;
    const projectTags = projectContent.tags || [];

    // 取得所有 tag 相關的相片清單 (僅 metadata)
    const photosByTags = await Promise.all(
      projectTags.map((tag: string) => getPhotoItemsByProjectTag(tag))
    );

    const allPhotos = photosByTags.flat();
    // 過濾重複並且符合該 project tags 的照片
    const uniquePhotos = Array.from(new Map(allPhotos.map(p => [p.id, p])).values());
    const matchingPhotos = uniquePhotos.filter((photo: any) => {
      const tags = photo.content.tags || [];
      return tags.some((t: string) => projectTags.includes(t));
    });

    // 找到同主題的其他專案 (theme tag 如 Theme:Kyoto)
    const themeTag = projectTags.find((tag: string) => tag.toLowerCase().includes("theme"));
    const themeTagPrefix = themeTag.split(":")[0]; // 取得 'Theme'
    const themeProjects = allProjects.contents.filter(p =>
      p.content.tags?.some((t: string) => t.startsWith(themeTagPrefix))
    );

    // 計算目前專案在主題清單中的 index，方便初始定位
    const currentIndex = themeProjects.findIndex(p => p.slug === slug);
    // 為方便傳入 CoverSlider，添加 position 欄位
    const adjacentProjects = themeProjects.map((p, idx) => ({
      ...p,
      position: idx - currentIndex,
    }));

    return (
      <>
        {/* Floating Navbar */}
        <ScrollableNav adjacentProjects={adjacentProjects} slug={slug} />

  
        {/* Main cover slider with Swiper */}
        <main className="pt-20 w-full py-10 max-w-7xl mx-auto overflow-hidden">
          <CoverSlider projects={adjacentProjects.map(p => ({
            slug: p.slug,
            content: {
              coverImage: p.content.coverImage,
              title: p.content.title,
              description: p.content.description,
            },
          }))} 
          currentSlug={slug} />
        </main>
        <div className="px-4">
          <PhotoGrid photos={matchingPhotos} />
        </div>
        
      </>
    );
  } catch (err) {
    console.error("Error loading project detail:", err);
    return notFound();
  }
}
