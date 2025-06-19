import { getPhotographyProjects } from "@/lib/wisp";

export default async function ProjectsPage() {
  const projects = await getPhotographyProjects();

  return (
    <main className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">Photography List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <div key={project.id} className="border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <p className="mt-2 text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
