import { Sparkles, GraduationCap, Users, HeartHandshake } from "lucide-react";
import { BusinessInfo } from "../types";

interface AboutProps {
  businessInfo: BusinessInfo;
  lang: "en" | "hi";
}

export default function About({ businessInfo, lang }: AboutProps) {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6 text-rose-800" />,
      title: lang === "en" ? "Unique Formula Coaching" : "अनोखा फॉर्मूला कोचिंग",
      desc: lang === "en" 
        ? "We don't teach dry grammar. Shamim Sir's trademark formulas make English speaking natural and intuitive."
        : "हम नीरस व्याकरण नहीं पढ़ाते। शमीम सर के ट्रेडमार्क फॉर्मूले अंग्रेजी बोलने को सहज और स्वाभाविक बनाते हैं।"
    },
    {
      icon: <Users className="w-6 h-6 text-rose-800" />,
      title: lang === "en" ? "Hindi-Medium Friendly" : "हिंदी माध्यम के लिए वरदान",
      desc: lang === "en"
        ? "Specially designed classes that respect local languages and transition students smoothly to fluent English."
        : "विशेष रूप से डिजाइन की गई कक्षाएं जो स्थानीय भाषाओं का सम्मान करती हैं और छात्रों को आसानी से अंग्रेजी सिखाती हैं।"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-800" />,
      title: lang === "en" ? "Purnia's Pioneer Institute" : "पूर्णिया का अग्रणी संस्थान",
      desc: lang === "en"
        ? "The oldest and most respected personality development and English speaking academy in the Kosi belt."
        : "कोसी बेल्ट में सबसे पुराना और सबसे सम्मानित व्यक्तित्व विकास और अंग्रेजी बोलने वाला अकादमी।"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "About Our Academy" : "हमारे संस्थान के बारे में"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-amber-800 text-sm font-semibold uppercase tracking-wider mt-4">
            {lang === "en" ? "Kosi Belt's Trusted Pioneer" : "कोसी क्षेत्र का भरोसेमंद अगुआ"}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text/Story Side */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-rose-900 leading-snug">
              {lang === "en"
                ? "Bridging the Rural-Urban Gap Since 2014"
                : "2014 से ग्रामीण-शहरी आत्मविश्वास के अंतर को पाटना"
              }
            </h3>

            {/* Sourced dynamically from businessInfo */}
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {lang === "en" ? businessInfo.about_story : businessInfo.about_story_hindi}
            </p>

            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-rose-950 font-medium">
                {lang === "en" 
                  ? "At American, we believe fluency in English is not a measure of intelligence, but a powerful skill that unlocks global opportunities. Our doors are open for everyone."
                  : "अमेरिकन अकादमी में हमारा मानना है कि अंग्रेजी में प्रवाह बुद्धिमत्ता की माप नहीं है, बल्कि एक शक्तिशाली कौशल है जो वैश्विक अवसरों को खोलता है।"
                }
              </p>
            </div>
          </div>

          {/* Highlights Grid Side */}
          <div className="space-y-6">
            <h4 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight text-center lg:text-left">
              {lang === "en" ? "What Makes Us Unique?" : "हमें क्या खास बनाता है?"}
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-stone-50 hover:bg-rose-50/30 rounded-2xl border border-stone-200/60 hover:border-rose-200/50 transition-all duration-200 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-3 bg-white rounded-xl border border-rose-100/50 shadow-xs">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-slate-900 text-base leading-none mb-2">
                      {item.title}
                    </h5>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
