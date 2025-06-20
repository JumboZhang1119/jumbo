import { getPhotographyProjects } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projectsResult = await getPhotographyProjects();
  if (!projectsResult || !projectsResult.contents) {
    return <div className="text-center py-20 text-gray-400">No projects found.</div>;
  }

  const projects = projectsResult.contents;

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Photography Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative w-full h-64">
              <Image
                src={project.content.coverImage}
                alt={project.content.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">{project.content.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.content.description || "No description"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
