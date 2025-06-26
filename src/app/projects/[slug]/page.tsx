import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import { getPhotographyProjects } from "@/lib/wisp";
import { getPhotoItemsByProjectTag } from "@/lib/photoItemApi";
import PhotoGrid from "./PhotoGrid";
import CoverSlider from './CoverSlider';
import ScrollableNav from './ScrollableNav';
import { Footer } from "@/components/Footer";



export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const result = await getPhotographyProjects();
  if (!result || !result.contents) return [];
  return result.contents.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage(context: {params: Promise<{ slug: string }>}) {
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

    const photosByTags = await Promise.all(
      projectTags.map((tag: string) => getPhotoItemsByProjectTag(tag))
    );

    const allPhotos = photosByTags.flat();
    const uniquePhotos = Array.from(new Map(allPhotos.map(p => [p.id, p])).values());
    const matchingPhotos = uniquePhotos.filter((photo: any) => {
      const tags = photo.content.tags || [];
      return tags.some((t: string) => projectTags.includes(t));
    });

    const tagType = projectTags.find((tag: string) =>
      tag.toLowerCase().startsWith("theme:") || tag.toLowerCase().startsWith("category:")
    );

    if (!tagType) return notFound();

    const tagPrefix = tagType.split(":")[0]; 

    const relatedProjects = allProjects.contents.filter(p =>
      p.content.tags?.some((t: string) => t.startsWith(tagPrefix))
    );

    const currentIndex = relatedProjects.findIndex(p => p.slug === slug);

    const adjacentProjects = relatedProjects.map((p, idx) => ({
      ...p,
      position: idx - currentIndex,
    }));

    return (
      <>
        {/* Floating Navbar */}
        <ScrollableNav adjacentProjects={adjacentProjects} slug={slug} />

  
        {/* Main cover slider with Swiper */}
        <main className="pt-20 w-full py-10 overflow-hidden">
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
        <div className="-mt-10 px-4">
          <PhotoGrid photos={matchingPhotos} />
          <Footer />
        </div>
        
      </>
    );
  } catch (err) {
    console.error("Error loading project detail:", err);
    return notFound();
  }
}
