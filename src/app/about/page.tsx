// app/about/page.tsx
import Image from "next/image";
import Markdown from "react-markdown";
import { signOgImageUrl } from "@/lib/og-image";
import { config } from "@/config";
import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";

const content = `

Hey there! I'm Samantha, a 28-year-old former corporate warrior who decided to ditch the 9-to-5 grind and embark on an adventure of a lifetime.  
After years of hustling in a high-pressure job, I realized that life is too short to be stuck in an office, staring at spreadsheets all day.

So I took a leap of faith, quit my cushy job in Singapore, and decided to see the world on my own terms.  
This blog is where I'll be documenting my travels, sharing my experiences, and hopefully inspiring others to follow their wanderlust.

Let's go on an adventure!

**Love,**  
Samantha
`;

export async function generateMetadata() {
  return {
    title: {
      absolute: "Po-Feng's Web", // 這樣就不會套用 `%s - Po-Feng's Website`
    },
    description: "This is a page about Po-Feng Zhang.",
    openGraph: {
      title: "Po-Feng's Web",
      description: "This is a page about Po-Feng Zhang.",
      images: [
        "https://res.cloudinary.com/dvxhki7cj/image/upload/v1750587629/DSC01179_1_tx3da4.jpg",
      ],
    },
  };
}


const Page = async () => {
  return (
    <>
      <GlobalNavbar />
      <div className="container mx-auto px-5 pt-[120px] pb-16">
        <div className="mb-10 flex justify-center">
          <Image
            src="https://res.cloudinary.com/dvxhki7cj/image/upload/v1750587629/DSC01179_1_tx3da4.jpg"
            alt="Jumbo Portrait"
            width={250}
            height={250}
            className="rounded-full object-cover"
          />
        </div>
        <div className="prose mb-5 dark:prose-invert mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bbold mb-3">PO-FENG ZHANG</h1>
          <h1 className="text-2xl font-bbold mb-2">張柏豐</h1>
        </div>
        <SocialLinks />
        <div className="mb-7"></div>
        <div className="prose lg:prose-lg dark:prose-invert mx-auto max-w-2xl text-center">
          <Markdown>{content}</Markdown>
        </div>
        

        <div className="mt-10 flex justify-center">
          <Image
            src="https://res.cloudinary.com/dvxhki7cj/image/upload/v1750592680/IMG_4061_1_lci1gs.jpg"
            alt="Jumbo"
            width={640}
            height={360}
            className="rounded-xl object-cover"
          />
        </div>
        <Footer />
        
      </div>
      
    </>
  );
};

export default Page;
