import { getPhotographyProjects } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projectsResult = await getPhotographyProjects();
  if (!projectsResult || !projectsResult.contents) {
    return <div>No projects found or failed to load.</div>;
  }

  const projects = projectsResult.contents;

  return (
    <main className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">Photography List</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="break-inside-avoid block group"
          >
            <Image
              src={project.content.coverImage}
              alt={project.content.title}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-md group-hover:opacity-80 transition"
            />
            <h2 className="text-lg font-medium mt-2 group-hover:underline">
              {project.content.title}
            </h2>
            <p className="text-sm text-gray-600">{project.content.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
