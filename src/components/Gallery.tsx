import { useState } from "react";
import { Image as ImageIcon, X, ZoomIn } from "lucide-react";
import { GalleryItem } from "../types";

interface GalleryProps {
  gallery: GalleryItem[];
  lang: "en" | "hi";
}

export default function Gallery({ gallery, lang }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Extract unique categories, default to preset list if none
  const categories = ["All", ...Array.from(new Set(gallery.map((item) => item.category)))];

  // Filter images
  const filteredGallery = selectedCategory === "All" 
    ? gallery 
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 bg-slate-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "Life at American Academy" : "अमेरिकन अकादमी की झलकियाँ"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {lang === "en"
              ? "Take a look at our interactive classroom, seminar, and speaking event memories."
              : "हमारे इंटरएक्टिव क्लासरूम, सेमिनार और स्पीकिंग इवेंट्स की यादें देखें।"}
          </p>
        </div>

        {/* Filter Tabs (Only show if there are more than 4 images) */}
        {gallery.length > 4 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-rose-900 text-white border-transparent shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-rose-900/20 hover:bg-rose-50/50"
                }`}
              >
                {cat === "All" ? (lang === "en" ? "All" : "सभी") : cat}
              </button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div 
              key={index}
              onClick={() => setLightboxImage(item)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer relative"
            >
              {/* Photo */}
              <div className="aspect-video overflow-hidden bg-slate-100 relative">
                <img 
                  src={item.image_url} 
                  alt={item.caption}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/90 rounded-full text-rose-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-rose-900 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                  {item.category}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 border-t border-slate-100">
                <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed group-hover:text-rose-950 transition-colors">
                  {lang === "hi" && item.caption_hindi ? item.caption_hindi : item.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div 
              className="max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.image_url} 
                alt={lightboxImage.caption} 
                referrerPolicy="no-referrer"
                className="w-full max-h-[70vh] object-contain mx-auto bg-slate-950"
              />
              <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 text-white text-center">
                <span className="inline-block bg-rose-800 text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md mb-2">
                  {lightboxImage.category}
                </span>
                <p className="text-sm sm:text-base font-medium">
                  {lang === "hi" && lightboxImage.caption_hindi ? lightboxImage.caption_hindi : lightboxImage.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
