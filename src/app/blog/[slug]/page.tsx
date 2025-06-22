// app/blog/[slug]/page.tsx
import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";

interface Params {
  slug: string;
}

export default async function BlogPost({ params }: { params: {slug: string}; }) {
  const result = await wisp.getPost(params.slug);

  if (!result.post) return notFound();

  const { title, content, publishedAt, createdAt, tags } = result.post;

  return (
    <>
      <GlobalNavbar />
      <main className="prose lg:prose-xl dark:prose-invert mx-auto pt-28 pb-20 px-4">
        <h1>{title}</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-8 text-sm text-gray-500">
          {tags.map((tag) => (
            <span key={tag.id} className="mr-2">#{tag.name}</span>
          ))}
          <div className="mt-2">
            {new Date(publishedAt || createdAt).toLocaleDateString()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
