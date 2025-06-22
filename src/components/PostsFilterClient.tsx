'use client';

import { useState, useMemo } from "react";
import AnimatedPostGrid from "@/components/AnimatedPostGrid";

interface Post {
  id: string;
  slug: string;
  title: string;
  image?: string | null;  // 允許 image 為 null
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: (string | { id?: string; name?: string })[];  // 新增 tags 欄位
}

export default function PostsFilterClient({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        if (typeof tag === "string") tagSet.add(tag);
        else if (typeof tag === "object" && tag.name) tagSet.add(tag.name);
      });
    });
    return ["All", ...Array.from(tagSet)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) =>
      (post.tags || []).some((tag) =>
        typeof tag === "string" ? tag === activeTag : tag.name === activeTag
      )
    );
  }, [posts, activeTag]);

  return (
    <>
      <div className="mb-11 flex flex-wrap gap-2 justify-center">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
              activeTag === tag
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatedPostGrid posts={filteredPosts} />
    </>
  );
}
