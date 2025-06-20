// import { BlogPostsPreview } from "@/components/BlogPostPreview";
// import { BlogPostsPagination } from "@/components/BlogPostsPagination";
// import { Footer } from "@/components/Footer";
// import { Header } from "@/components/Header";
// import { wisp } from "@/lib/wisp";

// const Page = async (
//   props: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
//   }
// ) => {
//   const searchParams = await props.searchParams;
//   const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
//   const result = await wisp.getPosts({ limit: 6, page });
//   return (
//     <div className="container mx-auto px-5 mb-10">
//       <Header />
//       <BlogPostsPreview posts={result.posts} />
//       <BlogPostsPagination pagination={result.pagination} />
//       <Footer />
//     </div>
//   );
// };

// export default Page;
import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";
import { getPhotographyProjects } from "@/lib/wisp";
import ProjectCard from "@/components/ProjectCard";

export default async function Page() {
  const projectData = await getPhotographyProjects();
  const projects = projectData?.contents ?? [];

  return (
    <>
      <GlobalNavbar />

      <div className="container mx-auto px-5 pt-24 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Photography Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

