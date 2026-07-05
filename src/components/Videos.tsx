import { useState, useMemo } from "react";
import { Youtube, Play, X, ArrowUpRight, MonitorPlay } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Video } from "../types";

interface VideosProps {
  videos: Video[];
  lang: "en" | "hi";
}

// Extract YouTube ID helper
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Videos({ videos = [], lang }: VideosProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Sort and memoize videos so featured ones are always first
  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const aFeat = a.featured?.trim().toLowerCase() === "yes";
      const bFeat = b.featured?.trim().toLowerCase() === "yes";
      if (aFeat && !bFeat) return -1;
      if (!aFeat && bFeat) return 1;
      return 0;
    });
  }, [videos]);

  const handleOpenVideo = (videoUrl: string) => {
    const id = getYouTubeId(videoUrl);
    if (id) {
      setActiveVideoId(id);
    }
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos" className="py-16 bg-rose-50/10 border-b border-rose-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Youtube className="w-4 h-4 fill-current" />
            {lang === "en" ? "Free Video Lessons" : "मुफ्त वीडियो क्लासेस"}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "Learn on Shamim Sir's YouTube Channel" : "शमीम सर के यूट्यूब चैनल पर सीखें"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            {lang === "en"
              ? "Access free high-impact lessons on spoken English, grammar drills, stage fear elimination, and interview preparation straight from our classrooms."
              : "हमारे क्लासरूम से सीधे स्पोकन इंग्लिश, व्याकरण अभ्यास, स्टेज के डर को दूर करने और इंटरव्यू की तैयारी पर मुफ्त प्रभावी वीडियो क्लासेस देखें।"}
          </p>
        </div>

        {/* Subscribe Banner/Bar */}
        <div className="mb-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-red-500/10 rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 text-center md:text-left z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
                <Youtube className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {lang === "en" ? "Subscribe to American English Academy" : "अमेरिकन इंग्लिश एकेडमी को सब्सक्राइब करें"}
                </h3>
                <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
                  {lang === "en"
                    ? "Never miss a new live video lesson. Join 10,000+ online learners and upgrade your skills daily!"
                    : "कभी भी कोई नई लाइव वीडियो क्लास न छोड़ें। 10,000 से अधिक ऑनलाइन शिक्षार्थियों में शामिल हों!"}
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@americanbyshamimsir"
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 bg-white text-red-600 hover:bg-slate-50 px-6 py-3.5 rounded-2xl font-extrabold text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>{lang === "en" ? "Subscribe Now" : "अभी सब्सक्राइब करें"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.map((video, index) => {
            const videoId = getYouTubeId(video.video_url);
            if (!videoId) return null;

            const isFeatured = video.featured?.trim().toLowerCase() === "yes";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row" : "col-span-1"
                }`}
                id={`video-card-${index}`}
              >
                {/* Thumbnail Container */}
                <div 
                  className={`relative cursor-pointer overflow-hidden bg-slate-900 shrink-0 ${
                    isFeatured ? "md:w-1/2 h-52 sm:h-64 md:h-full min-h-[220px]" : "aspect-video"
                  }`}
                  onClick={() => handleOpenVideo(video.video_url)}
                >
                  {/* YouTube Thumbnail (Lazy-loaded) */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 flex items-center justify-center transition-all duration-300">
                    <div className="w-14 h-14 bg-red-600 group-hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {isFeatured && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full uppercase tracking-widest shadow-md">
                      ⭐ {lang === "en" ? "Featured" : "विशेष"}
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className={`font-display font-extrabold text-slate-900 group-hover:text-red-600 transition-colors duration-200 leading-snug ${
                      isFeatured ? "text-lg sm:text-xl" : "text-base"
                    }`}>
                      {video.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-3 line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenVideo(video.video_url)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MonitorPlay className="w-4 h-4" />
                      <span>{lang === "en" ? "Watch Video Inline" : "यहाँ चलाएं"}</span>
                    </button>
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                    >
                      <span>YouTube</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing CTA Banner */}
        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@americanbyshamimsir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>{lang === "en" ? "Watch more free English lessons on YouTube" : "यूट्यूब पर और अधिक मुफ्त वीडियो क्लासेस देखें"}</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xs"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 z-10 p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-colors focus:outline-none cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* YouTube Player (Only loaded when active) */}
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
