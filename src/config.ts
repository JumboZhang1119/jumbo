const buildConfig = () => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) throw new Error("NEXT_PUBLIC_BLOG_ID is missing");
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "Life.";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Samantha & Jumbo";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Photography & Blog | Jumbo Zhang";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Blog about travel and lifestyle.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: defaultTitle,
        },
        description: defaultDescription,
        openGraph: {
          type: "website",
          url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
          title: "PO-FENG Photography",
          description: "Explore a curated selection of themed photography projects.",
          images: [
            {
              url: "https://res.cloudinary.com/dvxhki7cj/image/upload/v1750700064/DSC01685_pkm0sy.jpg",
              width: 1200,
              height: 800,
              alt: "Photography Cover",
            },
          ],
        },
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  };
};

export const config = buildConfig();
