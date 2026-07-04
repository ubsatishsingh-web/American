import { MessageSquare, Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonials: Testimonial[];
  lang: "en" | "hi";
}

export default function Testimonials({ testimonials, lang }: TestimonialsProps) {
  return (
    <section className="py-16 bg-white border-b border-rose-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "What Our Alumni Say" : "हमारे सफल छात्रों की जुबानी"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {lang === "en"
              ? "Over 10,000+ success stories from Purnia and the entire Kosi-Seemanchal belt."
              : "पूर्णिया और पूरे कोसी-सीमांचल क्षेत्र से 10,000 से अधिक सफल कहानियाँ।"}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div 
              key={index}
              className="bg-stone-50 border border-stone-200/60 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              {/* Quote Icon Accent */}
              <div className="absolute top-6 right-6 text-rose-900/10">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>

              <div>
                {/* Star rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-sans text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{lang === "hi" && t.content_hindi ? t.content_hindi : t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 border-t border-stone-200/50 pt-4 mt-auto">
                <img 
                  src={t.image_url} 
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-rose-900/20"
                />
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">
                    {lang === "hi" && t.name_hindi ? t.name_hindi : t.name}
                  </h4>
                  <p className="font-sans text-[11px] font-medium text-amber-800 mt-0.5">
                    {lang === "hi" && t.role_hindi ? t.role_hindi : t.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Trust Stat */}
        <div className="mt-12 bg-rose-900/5 border border-rose-900/10 rounded-2xl p-6 max-w-xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-rose-950 font-semibold flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-rose-900" />
            {lang === "en"
              ? "Want to talk to our alumni? Ask during your free demo class!"
              : "हमारे सफल छात्रों से बात करना चाहते हैं? अपनी फ्री डेमो क्लास के दौरान पूछें!"}
          </p>
        </div>

      </div>
    </section>
  );
}
