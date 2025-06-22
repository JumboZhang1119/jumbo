"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isClosing, setIsClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [exitMode, setExitMode] = useState<"slide" | "scale">("slide");


  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // 手指開始觸控，紀錄 Y 位置
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }

  // 手指離開時判斷滑動距離
  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (isClosing) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY.current;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaY > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      // 觸發關閉動畫（不是直接隱藏）
      setExitMode("scale");
      setIsClosing(true);
      return;
    }

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // 向右滑（上一張）
        if (currentIndex !== null && currentIndex > 0) {
          setDirection("right"); 
          const newIndex = currentIndex - 1;
          setCurrentIndex(newIndex);
          setSelectedPhoto(photos[newIndex]);
          setIsFirstOpen(false);
        }
      } else {
        // 向左滑（下一張）
        if (currentIndex !== null && currentIndex < photos.length - 1) {
          setDirection("left"); 
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          setSelectedPhoto(photos[newIndex]);
          setIsFirstOpen(false);
        }
      }
    }
    
  }

  // 動畫結束 callback，真正關閉彈窗
  function handleAnimationComplete() {
    if (isClosing) {
      setSelectedPhoto(null);
      setIsClosing(false);
      setDirection(null);
      setExitMode("slide");
    }
  }

  useEffect(() => {
    if (selectedPhoto) {
      document.body.classList.add("modal-open");
      if (direction === null) {
        setDirection(null);
      }
    } else {
      document.body.classList.remove("modal-open");
      setIsClosing(false);
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedPhoto]);

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
            <div className="relative w-full cursor-pointer" onClick={() => {
              setSelectedPhoto(photo);
              setCurrentIndex(photos.findIndex(p => p.id === photo.id));
              setIsFirstOpen(true);
              setDirection(null);
              setExitMode("scale");
              }}
            >
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
      
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Outer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative z-10 w-full h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            > 
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  setExitMode("scale");
                }}
                className="absolute top-4 right-4 
                  bg-gray-500 text-white rounded-full px-3 py-1 text-xs z-30
                  hover:bg-gray-800 active:scale-95 shadow-sm hover:shadow-md 
                  transition-all duration-200"
              >
                Close ✕
              </button>
              {/* 左箭頭按鈕 */}
              <button
                onClick={() => {
                  if (currentIndex !== null && currentIndex > 0) {
                    setDirection("right");
                    const newIndex = currentIndex - 1;
                    setCurrentIndex(newIndex);
                    setSelectedPhoto(photos[newIndex]);
                  }
                }}
                className="absolute left-0 top-0 w-1/2 h-full z-20 bg-transparent"
                aria-label="Previous image"
              >
              </button>

              {/* 右箭頭按鈕 */}
              <button
                onClick={() => {
                  if (currentIndex !== null && currentIndex < photos.length - 1) {
                    setDirection("left");
                    const newIndex = currentIndex + 1;
                    setCurrentIndex(newIndex);
                    setSelectedPhoto(photos[newIndex]);
                  }
                }}
                className="absolute right-0 top-0 w-1/2 h-full z-20 bg-transparent"
                aria-label="Next image"
              >
              </button>

              <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm select-none z-20">
                {currentIndex !== null ? `${currentIndex + 1} / ${photos.length}` : ""}
              </div>
              {/* Inner */}
              <motion.div
                key={selectedPhoto.id}
                initial={
                  isFirstOpen
                    ? { scale: 0.8, opacity: 0, x: 0, y: 0 }
                    : { x: direction === "right" ? -200 : 200, y: 0, opacity: 0 }
                }
                animate={{
                  scale: 1,
                  x: 0,
                  y: isClosing ? 150 : 0,
                  opacity: isClosing ? 0 : 1,
                }}
                exit={
                  exitMode === "scale"
                    ? { scale: 0.8, opacity: 0 }               // ✅ 關閉：縮小
                    : direction === "right"
                    ? { x: 200, opacity: 0 }                   // ⬅️ 往右滑出去
                    : direction === "left"
                    ? { x: -200, opacity: 0 }                  // ➡️ 往左滑出去
                    : { opacity: 0 }
                }
                
                
                transition={{
                  x: { duration: 0.4 },             // 左右滑動切換動畫時間：5 秒
                  y: { duration: isClosing ? 0.3 : 0.3 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                onAnimationComplete={() => {
                  handleAnimationComplete();
                  if (isFirstOpen) setIsFirstOpen(false);  // 第一次動畫結束後設為 false
                }}
                className="flex flex-col flex-1"
              >
                <div className="relative flex-1">
                  <Image
                    src={selectedPhoto.content.image}
                    alt={selectedPhoto.content.title}
                    fill
                    className="object-contain rounded-xl"
                  />
                  
                </div>
                
                <div className="w-full flex justify-center mt-1 mb-4">
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
              </motion.div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      
    </>
  );
}
