import { Phone, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { BusinessInfo } from "../types";

interface HeroProps {
  businessInfo: BusinessInfo;
  lang: "en" | "hi";
}

export default function Hero({ businessInfo, lang }: HeroProps) {
  // Setup WhatsApp URL
  // "https://wa.me/919934216785?text=Hello,%20I%20am%20interested%20in%20the%20Spoken%20English%20classes."
  const defaultText = lang === "en" 
    ? "Hello, I am interested in joining your Spoken English and Personality Development batches. Please guide me."
    : "नमस्ते सर, मैं स्पोकन इंग्लिश और पर्सनालिटी डेवलपमेंट बैच जॉइन करने में रुचि रखता हूँ। कृपया मुझे जानकारी दें।";
  
  const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(defaultText)}`;

  const stats = [
    { label: lang === "en" ? "10,000+ Trained" : "10,000+ सफल छात्र", detail: lang === "en" ? "Over 10 years" : "10 वर्षों में" },
    { label: lang === "en" ? "2 Days Free Demo" : "2 दिन फ्री डेमो", detail: lang === "en" ? "No registration fee" : "कोई फीस नहीं" },
    { label: lang === "en" ? "Hindi-Medium Easy" : "हिंदी मीडियम अनुकूल", detail: lang === "en" ? "Special techniques" : "आसान और सरल भाषा" },
  ];

  return (
    <section className="relative overflow-hidden bg-radial from-rose-50/70 via-white to-white py-12 lg:py-20 border-b border-rose-100">
      {/* Background Graphic Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -top-10 right-10 w-[200px] h-[200px] bg-rose-200/20 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Localized Badge */}
            <div className="inline-flex items-center space-x-1.5 bg-rose-900/10 text-rose-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0">
              <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
              <span>{lang === "en" ? "Kosi Belt's No. 1 Academy" : "कोसी क्षेत्र का नंबर 1 संस्थान"}</span>
            </div>

            {/* Title / Name */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none">
              {lang === "en" ? "American" : "अमेरिकन"}{" "}
              <span className="text-rose-950 block sm:inline font-display text-3xl sm:text-4xl lg:text-5xl mt-2 sm:mt-0 font-bold">
                {lang === "en" ? "by Shamim Sir" : "बाय शमीम सर"}
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-amber-800 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {lang === "en" ? businessInfo.tagline : businessInfo.tagline_hindi}
            </p>

            {/* Simple descriptive blurb */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {lang === "en" 
                ? "Gain fluency, crush stage fear, and build real confidence in Purnia, Bihar. Learn through Shamim Sir's world-famous simple communication formulas."
                : "पूर्णिया, बिहार में अंग्रेजी बोलना सीखें, स्टेज का डर खत्म करें और वास्तविक आत्मविश्वास पाएं। शमीम सर के विश्व प्रसिद्ध सरल कम्युनिकेशन फॉर्मूले के माध्यम से सीखें।"
              }
            </p>

            {/* CTA Buttons (Call & WhatsApp) */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-sm uppercase tracking-wider px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150"
              >
                <Phone className="w-5 h-5 text-slate-950" />
                <span>{lang === "en" ? "Call Now" : "अभी कॉल करें"}</span>
              </a>
              
              <a
                href={whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-150"
              >
                <MessageSquare className="w-5 h-5 text-white fill-current" />
                <span>{lang === "en" ? "WhatsApp Enquiry" : "व्हाट्सएप पर पूछें"}</span>
              </a>
            </div>

            {/* Key trust builders for local crowd */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-rose-800 mr-1.5" />
                {lang === "en" ? "Individual attention to everyone" : "हर छात्र पर व्यक्तिगत ध्यान"}
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-rose-800 mr-1.5" />
                {lang === "en" ? "Weekly group discussion rounds" : "साप्ताहिक ग्रुप डिस्कशन राउंड"}
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-rose-800 mr-1.5" />
                {lang === "en" ? "Daily presentation drills" : "दैनिक प्रेजेंटेशन अभ्यास"}
              </span>
            </div>

          </div>

          {/* Decorative Stat Cards Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-sm">
              
              {/* Outer Glow Decoration */}
              <div className="absolute inset-0 bg-rose-900/5 rounded-3xl transform rotate-3 scale-102 -z-10" />
              
              {/* Main Visual Card */}
              <div className="bg-white border-2 border-rose-900/10 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-900/5 rounded-full -mr-8 -mt-8" />
                
                <h3 className="font-display font-bold text-lg text-rose-900 border-b border-rose-50 pb-3 flex items-center">
                  <Sparkles className="w-4 h-4 text-amber-500 mr-2" />
                  {lang === "en" ? "Why Purnia trusts Shamim Sir:" : "पूर्णिया शमीम सर पर भरोसा क्यों करता है:"}
                </h3>

                {/* Stats rows */}
                <div className="space-y-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 bg-rose-50/50 rounded-xl border border-rose-100/50">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-900 text-white flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-sans font-bold text-slate-800 text-sm sm:text-base leading-none">
                          {stat.label}
                        </p>
                        <p className="font-sans text-xs text-slate-500 mt-1">
                          {stat.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Local Quote Accent */}
                <div className="text-center italic text-xs text-amber-900 bg-amber-50 rounded-lg p-3 border border-amber-100">
                  {lang === "en" 
                    ? "“Our goal is simple: no student from Seemanchal should lose job opportunities because of poor English.”"
                    : "“हमारा लक्ष्य स्पष्ट है: अंग्रेजी के अभाव में सीमांचल का कोई भी बच्चा अवसरों से वंचित न रहे।”"
                  }
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
