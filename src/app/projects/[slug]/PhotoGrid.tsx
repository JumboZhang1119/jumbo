// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// interface PhotoGridProps {
//   photos: any[];
// }

// export default function PhotoGrid({ photos }: PhotoGridProps) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {photos.map((photo) => (
        
        
//         <motion.div
//           key={photo.id}
//           initial={{ opacity: 0, transform: "translateY(30px)" }}
//           animate={{ opacity: 1, transform: "translateY(0px)" }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white"
//         >
//           <div className="relative aspect-[3/2]"> 
//             <Image
//               src={photo.content.image}
//               alt={photo.content.title}
//               fill
//               className="object-cover"
//             />

//           </div>
//           <div className="p-4">
//             <h3 className="text-lg font-medium mb-1">{photo.content.title}</h3>
//             <p className="text-sm text-gray-500 mb-2">
//               {photo.content.description || "No description."}
//             </p>
//             <div className="text-xs text-gray-400 space-y-0.5">
//               <p>Camera: {photo.content.cameraModel}</p>
//               <p>Lens: {photo.content.lens}</p>
//               <p>
//                 ƒ/{photo.content.aperture} · {photo.content.shutterSpeed}s · ISO {photo.content.iso}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
    
//   );
// }
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoGridProps {
  photos: any[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [showMetadata, setShowMetadata] = useState(true);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowMetadata((prev) => !prev)}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
        >
          {showMetadata ? "隱藏參數" : "顯示參數"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, transform: "translateY(30px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={photo.content.image}
                alt={photo.content.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-1">
                {photo.content.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {photo.content.description || "No description."}
              </p>

              {showMetadata && (
                <div className="text-xs text-gray-400 space-y-0.5">
                  <p>Camera: {photo.content.cameraModel}</p>
                  <p>Lens: {photo.content.lens}</p>
                  <p>
                    ƒ/{photo.content.aperture} ·{" "}
                    {photo.content.shutterSpeed}s · ISO {photo.content.iso}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
