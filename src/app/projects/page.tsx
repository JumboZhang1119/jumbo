import { getPhotographyProjects } from "@/lib/wisp";
import Image from "next/image";

export default async function ProjectsPage() {
  const projectsResult = await getPhotographyProjects();
  console.log("projectsResult:", projectsResult);

  if (!projectsResult || !projectsResult.contents) {
    return <div>No projects found or failed to load.</div>;
  }

  const projects = projectsResult.contents;

  return (
    <main className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">Photography List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="border rounded shadow p-4">
            {/* title 從 project.content 取 */}
            <h2 className="text-xl font-semibold mb-2">{project.content.title}</h2>

            {/* coverImage 也從 project.content 取 */}
            {project.content.coverImage && (
              <Image
                src={project.content.coverImage}
                alt={project.content.title}
                width={3600}  // next/image 需要設定寬高
                height={2400}
                className="w-full h-auto"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
