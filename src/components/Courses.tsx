import { Clock, IndianRupee, BookOpenCheck, ArrowRight } from "lucide-react";
import { Course } from "../types";

interface CoursesProps {
  courses: Course[];
  lang: "en" | "hi";
  onSelectCourse: (courseName: string) => void;
}

export default function Courses({ courses, lang, onSelectCourse }: CoursesProps) {
  return (
    <section id="courses" className="py-16 bg-slate-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "Our Training Programs" : "हमारे ट्रेनिंग कोर्सेज"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {lang === "en" 
              ? "All programs are interactive, pocket-friendly, and designed specifically for competitive excellence."
              : "सभी कोर्सेज इंटरएक्टिव, बजट-अनुकूल और प्रतियोगी उत्कृष्टता के लिए विशेष रूप से डिजाइन किए गए हैं।"
            }
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 hover:border-rose-900/10 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Corner Accent badge */}
              <div className="absolute top-0 right-0 bg-rose-900 text-white text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-bl-xl">
                {course.duration}
              </div>

              <div>
                {/* Course Name */}
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-tight mb-3 group-hover:text-rose-900 transition-colors">
                  {lang === "hi" && course.name_hindi ? course.name_hindi : course.name}
                </h3>

                {/* Course Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {lang === "hi" && course.description_hindi ? course.description_hindi : course.description}
                </p>
              </div>

              {/* Course Meta (Fee, Timings) */}
              <div className="border-t border-slate-100 pt-4 mt-auto space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  
                  {/* Fee tag */}
                  <div className="flex items-center text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg font-bold border border-amber-100">
                    <IndianRupee className="w-3.5 h-3.5 mr-1" />
                    <span>{course.fee}</span>
                  </div>

                  {/* Batch Timings */}
                  <div className="flex items-center text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-rose-800" />
                    <span>{course.timings}</span>
                  </div>

                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectCourse(course.name)}
                  className="w-full mt-2 flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-900 hover:text-white border border-rose-900/10 hover:border-transparent text-rose-900 font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-200"
                >
                  <BookOpenCheck className="w-4 h-4" />
                  <span>{lang === "en" ? "Enquire & Book Seat" : "सीट बुक करने के लिए पूछें"}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
