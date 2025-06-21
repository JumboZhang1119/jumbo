// components/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative aspect-[4/3]">
        <Image
          src={project.content.coverImage}
          alt={project.content.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold group-hover:underline">{project.content.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{project.content.description ?? "No description."}</p>
      </div>
    </Link>
  );
}
