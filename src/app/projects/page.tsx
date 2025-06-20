// app/projects/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { getPhotographyProjects } from '@/lib/wisp';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const getResizedImage = (url: string, width: number) =>
  url.replace('/upload/', `/upload/w_${width}/`);


export default function ProjectsPageWrapper() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);
  const [themeTags, setThemeTags] = useState<string[]>([]);
  const [mode, setMode] = useState<'category' | 'theme'>('theme');
  const [activeTag, setActiveTag] = useState<string>('Theme:All');

  useEffect(() => {
    async function fetchProjects() {
      const result = await getPhotographyProjects();
      if (!result || !result.contents) return;

      const data = result.contents;
      setProjects(data);

      const categorySet = new Set<string>();
      const themeSet = new Set<string>();
      data.forEach((p) => {
        (p.content.tags || []).forEach((tag: string) => {
          if (tag.startsWith('Category:')) categorySet.add(tag);
          if (tag.startsWith('Theme:')) themeSet.add(tag);
        });
      });

      setCategoryTags(Array.from(categorySet));
      setThemeTags(['Theme:All', ...Array.from(themeSet)]);
    }

    fetchProjects();
  }, []);

  const handleSelectMode = (selected: 'category' | 'theme') => {
    setMode(selected);
    setActiveTag(selected === 'theme' ? 'Theme:All' : '');
  };

  const handleFilter = (tag: string) => {
    setActiveTag(tag);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const tags: string[] = p.content.tags || [];
      const modePrefix = mode === 'category' ? 'Category:' : 'Theme:';
      const hasModeTag = tags.some((t) => t.startsWith(modePrefix));
      const hasSelected = activeTag === 'Theme:All' || !activeTag ? true : tags.includes(activeTag);
      return hasModeTag && hasSelected;
    });
  }, [projects, mode, activeTag]);

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10 font-sans">
      {/* Floating navbar */}
      <div className="fixed top-0 left-0 w-full bg-white/45 backdrop-blur-md shadow z-50 py-4 px-6 flex justify-center gap-4 border-b border-gray-200">
        {['category', 'theme'].map((type) => (
          <button
            key={type}
            onClick={() => handleSelectMode(type as 'category' | 'theme')}
            className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              mode === type
                ? 'text-black bg-gray-400/40 backdrop-blur-md border border-gray-500/50 shadow-sm'
                : 'text-gray-500 hover:text-black hover:bg-gray-200/50 hover:backdrop-blur-md hover:border hover:border-gray-400/40'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="pt-28">
        {/* <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">Photography Projects</h1> */}
        <h1 className="text-5xl sm:text-6xl font-medium mb-6 text-center tracking-wide" style={{ fontFamily: 'OneDay, sans-serif' }}>Photography Projects</h1>

        {mode === 'theme' && (
          <div className="mb-6 text-center">
            <h2 className="text-base font-medium mb-2 text-gray-600">Select a Theme</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {themeTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleFilter(tag)}
                  className={`cursor-pointer px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                    tag === activeTag
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black bg-neutral-100'
                  }`}
                >
                  {tag.replace('Theme:', '')}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={getResizedImage(project.content.coverImage, 1200)}
                    alt={project.content.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h2 className="text-lg font-semibold group-hover:text-black transition">
                    {project.content.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {project.content.description || 'No description'}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
