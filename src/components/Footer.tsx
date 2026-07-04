import { Heart, Globe } from "lucide-react";
import { BusinessInfo } from "../types";

interface FooterProps {
  businessInfo: BusinessInfo;
  lang: "en" | "hi";
}

export default function Footer({ businessInfo, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand/Academy info */}
          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-white text-lg tracking-tight">
              {businessInfo.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === "en" ? businessInfo.tagline : businessInfo.tagline_hindi}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {lang === "en" ? "Pioneering quality education in Seemanchal & Kosi region since 2014." : "2014 से सीमांचल और कोसी क्षेत्र में गुणवत्तापूर्ण शिक्षा का अग्रदूत।"}
            </p>
          </div>

          {/* Quick batch info */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {lang === "en" ? "Batch Timings" : "बैच का समय"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex justify-between border-b border-slate-800/50 pb-1">
                <span>{lang === "en" ? "Morning Batches" : "सुबह के बैच"}</span>
                <span className="text-slate-300 font-semibold">07:00 AM - 12:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/50 pb-1">
                <span>{lang === "en" ? "Evening Batches" : "शाम के बैच"}</span>
                <span className="text-slate-300 font-semibold">04:00 PM - 07:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{lang === "en" ? "Sunday Practice Rounds" : "रविवार प्रैक्टिस राउंड"}</span>
                <span className="text-amber-500 font-bold">Special GD / Seminars</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {lang === "en" ? "Quick Links" : "त्वरित लिंक्स"}
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
              <a href="#about" className="hover:text-white transition-colors">{lang === "en" ? "About Us" : "परिचय"}</a>
              <a href="#courses" className="hover:text-white transition-colors">{lang === "en" ? "Courses" : "कोर्स"}</a>
              <a href="#gallery" className="hover:text-white transition-colors">{lang === "en" ? "Gallery" : "गैलरी"}</a>
              <a href="#faqs" className="hover:text-white transition-colors">{lang === "en" ? "FAQs" : "सवाल-जवाब"}</a>
              <a href="#contact" className="hover:text-white transition-colors">{lang === "en" ? "Contact" : "संपर्क"}</a>
            </div>
            
            <div className="pt-3 border-t border-slate-800 flex items-center space-x-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === "en" ? "Location: Purnia, Bihar, India" : "स्थान: पूर्णिया, बिहार, भारत"}</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Copyright notice */}
          <div>
            <p className="text-slate-500 text-center sm:text-left">
              &copy; {currentYear} {businessInfo.name}. {lang === "en" ? "All Rights Reserved." : "सर्वाधिकार सुरक्षित।"}
            </p>
          </div>

          {/* Mandatory Zera Tech credit */}
          <div className="flex items-center space-x-1.5 text-slate-500 font-medium">
            <span>Website by</span>
            <a 
              href="https://www.zeratech.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 font-bold underline flex items-center space-x-1"
            >
              <span>Zera Technologies</span>
            </a>
            <Heart className="w-3.5 h-3.5 text-rose-700 fill-current animate-pulse" />
          </div>

        </div>

      </div>
    </footer>
  );
}
