import { useState, useEffect } from "react";
import { Phone, MessageSquare, Loader2, Sparkles, ChevronUp } from "lucide-react";
import { SheetData } from "./types";
import { fallbackData } from "./data";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [data, setData] = useState<SheetData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load live data from local API route
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const payload = await response.json();
          if (payload && payload.data) {
            setData(payload.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live sheet data, using local fallback.", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set Basic Local SEO & Schema.org JSON-LD LocalBusiness Markup dynamically
  useEffect(() => {
    if (data && data.businessInfo) {
      const info = data.businessInfo;
      
      // 1. Update Title
      document.title = `${info.name} | Spoken English & Personality Development in Purnia`;
      
      // 2. Manage meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute(
        "content",
        `${info.name} is Bhatta Bazar Purnia's oldest spoken English and personality grooming academy. ${info.tagline}. Start your free demo classes now.`
      );

      // 3. Update / Inject LocalBusiness JSON-LD markup
      let schemaScript = document.getElementById("local-business-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
      schemaScript = document.createElement("script");
      schemaScript.id = "local-business-schema";
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": info.name,
        "description": info.tagline,
        "url": window.location.origin,
        "telephone": info.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": info.address,
          "addressLocality": "Purnia",
          "addressRegion": "Bihar",
          "postalCode": "854301",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.7733475",
          "longitude": "87.4695022"
        },
        "priceRange": "₹₹",
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        "openingHours": "Mo-Sa 07:00-19:00"
      });
      document.head.appendChild(schemaScript);
    }
  }, [data]);

  const handleSelectCourse = (courseName: string) => {
    setSelectedCourseName(courseName);
    // Auto scroll down to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const info = data.businessInfo;

  // WhatsApp Enquiry setup
  const whatsappText = lang === "en" 
    ? "Hello, I am interested in Spoken English classes. Please share batch schedules."
    : "नमस्ते सर, मैं स्पोकन इंग्लिश क्लासेस के बारे में जानना चाहता हूँ। कृपया विवरण भेजें।";
  const whatsappUrl = `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50/20 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-rose-900" />
        <h2 className="font-display font-extrabold text-slate-800 text-lg">
          {lang === "en" ? "American Spoken English Academy..." : "अमेरिकन स्पोकन इंग्लिश अकादमी..."}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === "en" ? "Fetching live schedule and info..." : "लाइव क्लास शेड्यूल्स और जानकारी लोड हो रही है..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-rose-50/20 text-slate-800">
      
      {/* 1. Header Navigation */}
      <Navbar 
        businessInfo={info} 
        lang={lang} 
        setLang={setLang} 
        onAdminClick={() => setAdminOpen(true)} 
      />

      {/* 2. Main Sections */}
      <main className="flex-grow">
        
        {/* Banner Alert for Free Demo */}
        <div className="bg-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold py-2 px-4 text-center tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-sm border-b border-amber-600/10">
          <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
          <span>
            {lang === "en" 
              ? "🎁 Limited Seats: 2 Days Free Demo Classes running now! Call today." 
              : "🎁 सीमित सीटें: 2 दिन की फ्री डेमो क्लास चल रही है! आज ही कॉल करें।"
            }
          </span>
        </div>

        {/* Sections */}
        <Hero businessInfo={info} lang={lang} />
        <About businessInfo={info} lang={lang} />
        <Courses courses={data.courses} lang={lang} onSelectCourse={handleSelectCourse} />
        <Testimonials testimonials={data.testimonials} lang={lang} />
        <Gallery gallery={data.gallery} lang={lang} />
        <Videos videos={data.videos} lang={lang} />
        <FAQs faqs={data.faqs} lang={lang} />
        <Contact 
          businessInfo={info} 
          courses={data.courses} 
          lang={lang} 
          selectedCourseName={selectedCourseName} 
        />
      </main>

      {/* 3. Footer credits */}
      <Footer businessInfo={info} lang={lang} />

      {/* 4. Overlays: Admin Panel Modal */}
      {adminOpen && (
        <AdminPanel lang={lang} onClose={() => setAdminOpen(false)} />
      )}

      {/* 5. Sticky Floating Mobile Action Contact Bar (Sticky on mobile only) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 grid grid-cols-2 gap-3">
        {/* Mobile quick call */}
        <a
          href={`tel:${info.phone}`}
          className="flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-xl border border-amber-600/35"
        >
          <Phone className="w-4 h-4 text-slate-950" />
          <span>{lang === "en" ? "Call Sir" : "कॉल करें"}</span>
        </a>

        {/* Mobile quick whatsapp */}
        <a
          href={whatsappUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-xl border border-emerald-700/35"
        >
          <MessageSquare className="w-4 h-4 text-white fill-current" />
          <span>{lang === "en" ? "WhatsApp" : "व्हाट्सएप"}</span>
        </a>
      </div>

      {/* 6. Scroll To Top Button (Floating bubble) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 p-3 bg-rose-950 hover:bg-rose-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 border border-rose-900/30 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

    </div>
  );
}
