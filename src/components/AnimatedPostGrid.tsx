'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  slug: string;
  title: string;
  image?: string | null;
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: (string | { id?: string; name?: string })[];  // 新增 tags 欄位
}

export default function AnimatedPostGrid({ posts }: { posts: Post[] }) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full h-64">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full" />
              )}
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold group-hover:text-black transition">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {(post.publishedAt || post.updatedAt) 
                    ? new Date(post.publishedAt ?? post.updatedAt!).toLocaleDateString() 
                    : ''}
              </p>


              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {post.description ?? ''}
              </p>

              {/* 新增 tags 顯示區塊 */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => {
                    if (typeof tag === 'string') {
                        return (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                            #{tag}
                        </span>
                        );
                    } else {
                        // 斷言 tag 是物件
                        const tagObj = tag as { id?: string; name?: string };
                        return (
                        <span
                            key={tagObj.id ?? tagObj.name ?? JSON.stringify(tagObj)}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700"
                        >
                            #{tagObj.name ?? JSON.stringify(tagObj)}
                        </span>
                        );
                    }
                    })}
                </div>
                )}


            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
