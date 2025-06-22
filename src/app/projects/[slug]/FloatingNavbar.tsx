// FloatingNavbar.tsx (Client Component)
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function FloatingNavbar({
  allProjects,
  currentSlug,
  mode,
  setMode,
}: {
  allProjects: any[];
  currentSlug: string;
  mode: 'category' | 'theme';
  setMode: (m: 'category' | 'theme') => void;
}) {
  const currentProject = allProjects.find((p) => p.slug === currentSlug);

  const relatedProjects = useMemo(() => {
    if (!currentProject) return [];
    const currentTags = currentProject.content.tags || [];
    return allProjects.filter((p) => {
      const tags = p.content.tags || [];
      return tags.some((t: string) => currentTags.includes(t));
    });
  }, [allProjects, currentSlug, currentProject]);

  const currentIndex = relatedProjects.findIndex((p) => p.slug === currentSlug);
  const displayProjects = relatedProjects.slice(
    Math.max(0, currentIndex - 1),
    currentIndex + 2
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md z-50 px-6 py-4 border-b border-gray-300 flex flex-col gap-3 items-center">
      <div className="flex gap-3">
        <Link
          href="/projects"
          className="font-semibold text-sm text-gray-700 hover:underline"
        >
          ← All Projects
        </Link>

        {['category', 'theme'].map((type) => (
          <button
            key={type}
            onClick={() => setMode(type as 'category' | 'theme')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              mode === type
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {displayProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
              project.slug === currentSlug
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {project.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
