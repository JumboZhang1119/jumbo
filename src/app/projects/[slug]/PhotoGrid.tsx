// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Masonry from 'react-masonry-css';

// const breakpointColumnsObj = {
//     default: 4,
//     1280: 3,
//     768: 2,
//     500: 1,
//   };
  

// interface PhotoGridProps {
//   photos: any[];
// }

// export default function PhotoGrid({ photos }: PhotoGridProps) {
//   const [showMetadata, setShowMetadata] = useState(false);
//   const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);


//   return (
//     <>
//       <div className="flex justify-end mb-4">
//         <button   
//             onClick={() => setShowMetadata((prev) => !prev)}
//             className={`
//                 px-4 py-2 font-bold rounded-md text-sm transition-all duration-200 shadow 
//                 hover:shadow-md active:scale-95
//                 ${showMetadata 
//                   ? "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 hover:text-black active:text-black"
//                   : "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900 hover:text-white active:text-white"
//                 }
//               `}
//             >
//             {showMetadata ? "Hide Information" : "Show Information"}
//         </button>

//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {photos.map((photo) => (
//           <motion.div
//             key={photo.id}
//             initial={{ opacity: 0, transform: "translateY(30px)" }}
//             animate={{ opacity: 1, transform: "translateY(0px)" }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white"
//           >
//             <div className="relative aspect-[3/2] cursor-pointer"
//               onClick={() => setSelectedPhoto(photo)}
//             >
//               <Image
//                 src={photo.content.image}
//                 alt={photo.content.title}
//                 fill
//                 className="object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </div>
            
//               {/* <h3 className="text-lg font-medium mb-1">
//                 {photo.content.title}
//               </h3> */}
            
//               {showMetadata && (
//                 <div className="p-4">
//                     <div className="text-xs text-gray-400 space-y-0.5">
//                     {/* <p className="text-sm text-gray-500 mb-2">
//                         {photo.content.description || "No description."}
//                     </p> */}
//                     <div className="flex gap-8 text-xs text-gray-400">
//                         <p>Camera: {photo.content.cameraModel}</p>
//                         <p>Lens: {photo.content.lens}</p>
//                     </div>
//                     <p>
//                         ƒ/{photo.content.aperture} ·{" "}
//                         {photo.content.shutterSpeed}s · ISO {photo.content.iso}
//                     </p>
//                     </div>
//                 </div>
//               )}
            
//           </motion.div>
//         ))}
//       </div>
//       {selectedPhoto && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
//             <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative max-w-6xl w-full h-full flex flex-col"
//             >
//             {/* 圖片本體 */}
//             <div className="relative flex-1">
//                 <Image
//                 src={selectedPhoto.content.image}
//                 alt={selectedPhoto.content.title}
//                 fill
//                 className="object-contain rounded-xl"
//                 />
//             </div>
//             <div className="w-full flex justify-center mt-1 mb-1">
//                 <div
//                     className="w-full max-w-[500px] flex justify-between gap-2 bg-black/60 text-white text-[10px] sm:text-xs px-3 py-1 rounded-md"
//                 >
//                     <div className="flex-1 truncate text-left">Camera: {selectedPhoto.content.cameraModel}</div>
//                     <div className="flex-1 truncate text-center">Lens: {selectedPhoto.content.lens}</div>
//                     <div className="flex-1 truncate text-right">
//                     ƒ/{selectedPhoto.content.aperture} · {selectedPhoto.content.shutterSpeed}s · ISO{selectedPhoto.content.iso}
//                     </div>
//                 </div>
//             </div>
//             {/* 關閉按鈕 */}
//             <button
//                 onClick={() => setSelectedPhoto(null)}
//                 className="absolute top-4 right-4 
//                             bg-gray-500 text-white 
//                             rounded-full px-3 py-1 text-xs 
//                             hover:bg-gray-800 hover:text-white 
//                             active:scale-95 active:bg-gray-700 
//                             shadow-sm hover:shadow-md 
//                             transition-all duration-200"
//                 >
//                 Close ✕
//             </button>

//             </motion.div>
//         </div>
//         )}

//     </>
//   );
// }
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";

interface PhotoGridProps {
  photos: any[];
}

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  500: 1,
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowMetadata((prev) => !prev)}
          className={`
            px-4 py-2 font-bold rounded-md text-sm transition-all duration-200 shadow 
            hover:shadow-md active:scale-95
            ${
              showMetadata
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400"
                : "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900"
            }
          `}
        >
          {showMetadata ? "Hide Information" : "Show Information"}
        </button>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="masonry-column"
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition-all duration-300"
          >
            <div className="relative w-full cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
              <Image
                src={photo.content.image}
                alt={photo.content.title}
                width={photo.content.width || 800}   // 建議你在 wisp 資料裡補充圖片寬高
                height={photo.content.height || 600}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>

            {showMetadata && (
              <div className="p-4">
                <div className="text-xs text-gray-400 space-y-0.5">
                  <div className="flex gap-8 text-xs">
                    <p>Camera: {photo.content.cameraModel}</p>
                    <p>Lens: {photo.content.lens}</p>
                  </div>
                  <p>
                    ƒ/{photo.content.aperture} · {photo.content.shutterSpeed}s · ISO {photo.content.iso}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </Masonry>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl w-full h-full flex flex-col"
          >
            <div className="relative flex-1">
              <Image
                src={selectedPhoto.content.image}
                alt={selectedPhoto.content.title}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <div className="w-full flex justify-center mt-1 mb-1">
              <div className="w-full max-w-[500px] flex justify-between gap-2 bg-black/60 text-white text-[10px] sm:text-xs px-3 py-1 rounded-md">
                <div className="flex-1 truncate text-left">
                  Camera: {selectedPhoto.content.cameraModel}
                </div>
                <div className="flex-1 truncate text-center">
                  Lens: {selectedPhoto.content.lens}
                </div>
                <div className="flex-1 truncate text-right">
                  ƒ/{selectedPhoto.content.aperture} · {selectedPhoto.content.shutterSpeed}s · ISO {selectedPhoto.content.iso}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 
                bg-gray-500 text-white rounded-full px-3 py-1 text-xs 
                hover:bg-gray-800 active:scale-95 shadow-sm hover:shadow-md 
                transition-all duration-200"
            >
              Close ✕
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
