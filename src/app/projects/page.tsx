// app/projects/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { getPhotographyProjects } from '@/lib/wisp';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";

const getResizedImage = (url: string, width: number) =>
  url.replace('/upload/', `/upload/w_${width}/`);

export default function ProjectsPageWrapper() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);
  const [themeTags, setThemeTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode') || 'category';
  const activeTagParam = searchParams.get('activeTag') || '';
  const [mode, setMode] = useState<'category' | 'theme'>(modeParam as 'category' | 'theme');
  const [activeTag, setActiveTag] = useState(activeTagParam);
  

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
      setThemeTags(Array.from(themeSet));
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    setMode(modeParam as 'category' | 'theme');
    setActiveTag(activeTagParam);
  }, [modeParam, activeTagParam]);

  const handleSelectMode = (selected: 'category' | 'theme') => {
    setMode(selected);
    const newActiveTag = selected === 'theme' ? 'Theme:All' : '';
    setActiveTag(newActiveTag);
    router.push(`/projects?mode=${selected}&activeTag=${encodeURIComponent(newActiveTag)}`);
  };

  const handleFilter = (tag: string) => {
    setActiveTag(tag);
    router.push(`/projects?mode=${mode}&activeTag=${encodeURIComponent(tag)}`);
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
    <>
      <main className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10 font-sans">
        {/* Floating navbar */}
        <GlobalNavbar
          middleSlot={
            <div className="flex gap-2">
              {['category', 'theme'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelectMode(type as 'category' | 'theme')}
                  className={`cursor-pointer px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                    mode === type
                      ? 'text-black bg-gray-300 border-gray-500 shadow-sm'
                      : 'text-gray-600 hover:text-black hover:bg-gray-200 border-transparent'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          }
        />

        <div className="pt-20">
          <h1 className="text-5xl sm:text-6xl font-medium mb-8 text-center tracking-wide" style={{ fontFamily: 'OneDay, sans-serif' }}>
            Photography
          </h1>

          {(mode === 'theme' || mode === 'category') && (
            <div className="mb-6 flex justify-center items-center gap-4 text-center">
              <button
                onClick={() => handleFilter('')} 
                className={`flex-shrink-0 cursor-pointer px-4 py-1.5 text-sm rounded-full transition-colors duration-200 whitespace-nowrap ${
                  activeTag === ''
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black bg-neutral-100'
                }`}
              >
                All
              </button>
            
              <div className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex-1">
                {(mode === 'theme' ? themeTags : categoryTags).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleFilter(tag)}
                    className={`inline-block cursor-pointer px-4 py-1.5 text-sm rounded-full transition-colors duration-200 whitespace-nowrap ${
                      tag === activeTag
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black bg-neutral-100'
                    }`}
                  >
                    {tag.replace(`${mode.charAt(0).toUpperCase() + mode.slice(1)}:`, '')}
                  </button>
                ))}
              </div>
            </div>
          
          
          )}
          <div className='pt-5'></div>

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
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                      <div
                        dangerouslySetInnerHTML={{ __html: project.content.description || "No description." }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
    
  );
}
