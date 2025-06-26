'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CoverSlider.css';


interface Project {
  slug: string;
  content: {
    coverImage: string;
    title: string;
    description?: string;
  };
}

interface CoverSliderProps {
  projects: Project[];
  currentSlug: string;
}

export default function CoverSlider({ projects, currentSlug }: CoverSliderProps) {
  const router = useRouter();

  const [activeSlug, setActiveSlug] = useState(currentSlug);

  const activeIndex = projects.findIndex(p => p.slug === activeSlug);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'visible', 
      }}
      className="cover-slider-container"
    >
      <Swiper
        initialSlide={activeIndex >= 0 ? activeIndex : 0}
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        // slidesPerView={1.6}
        breakpoints={{
            0: {
              slidesPerView: 1.2, 
            },
            640: {
              slidesPerView: 1.3,  // sm breakpoint
            },
            1024: {
              slidesPerView: 1.5,  // lg breakpoint
            },
            1280: {
              slidesPerView: 1.7,  // xl breakpoint
            },
          }}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
            const nextProject = projects[swiper.realIndex];
            if (nextProject?.slug && nextProject.slug !== activeSlug) {
            setActiveSlug(nextProject.slug);
            setTimeout(() => {
                router.push(`/projects/${nextProject.slug}`);
            }, 300);
            }
        }}
        style={{ paddingBottom: '3rem'}}
        >
        {projects.map((project) => {
            const isCurrent = project.slug === activeSlug;

            return (
            <SwiperSlide
                key={project.slug}
                style={{
                opacity: isCurrent ? 1 : 0.5,
                transform: isCurrent ? 'scale(1)' : 'scale(0.8)',
                borderRadius: '1rem',
                overflow: 'hidden',
                cursor: 'pointer',
                }}
            >
                <Link href={`/projects/${project.slug}`}>
                <div style={{ position: 'relative', width: '100%' }} className="responsive-aspect">
                    <Image
                    src={project.content.coverImage}
                    alt={project.content.title}
                    className="object-cover rounded-xl"
                    fill
                    priority={isCurrent}
                    />
                    {isCurrent && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end p-6 rounded-xl">
                        <div className="text-white">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-md">{project.content.title}</h1>
                        <div className="text-xs sm:text-sm max-w-xl text-xs opacity-90">
                            <div
                                dangerouslySetInnerHTML={{ __html: project.content.description || "No description." }}
                            />
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </Link>
            </SwiperSlide>
            );
        })}
        </Swiper>
    </div>
    
  );
}
