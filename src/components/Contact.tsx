import React, { useState, useEffect } from "react";
import { MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { BusinessInfo, Course } from "../types";

interface ContactProps {
  businessInfo: BusinessInfo;
  courses: Course[];
  lang: "en" | "hi";
  selectedCourseName: string;
}

export default function Contact({ businessInfo, courses, lang, selectedCourseName }: ContactProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Pre-select course when user clicks Enquire from the Course Cards
  useEffect(() => {
    if (selectedCourseName) {
      setCourse(selectedCourseName);
      // Smooth scroll to the form
      const formEl = document.getElementById("enquiry-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedCourseName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError(lang === "en" ? "Name is required" : "नाम आवश्यक है");
      return;
    }

    // Basic 10-digit phone check for Indian mobile numbers
    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (phoneClean.length < 10) {
      setError(lang === "en" ? "Please enter a valid 10-digit phone number" : "कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneClean,
          course: course || "General Inquiry",
          message: message.trim()
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setName("");
        setPhone("");
        setCourse("");
        setMessage("");
      } else {
        throw new Error(result.error || "Failed to submit enquiry.");
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setError(
        lang === "en" 
          ? "Failed to submit. Your network might be slow, but we've recorded your attempt. Please call us directly!" 
          : "सबमिट करने में विफल। आपका नेटवर्क धीमा हो सकता है, कृपया सीधे हमें कॉल करें!"
      );
    } finally {
      setLoading(false);
    }
  };

  const defaultText = lang === "en" 
    ? "Hello, I want to join your spoken English course. Please send batch details."
    : "नमस्ते सर, मैं स्पोकन इंग्लिश कोर्स ज्वाइन करना चाहता हूँ। कृपया बैच की जानकारी भेजें।";
  const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(defaultText)}`;

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "Visit Us or Apply Now" : "अकादमी आएं या आवेदन करें"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {lang === "en"
              ? "Submit your details below and Shamim Sir's team will call you within 24 hours."
              : "नीचे अपना विवरण सबमिट करें और शमीम सर की टीम आपको 24 घंटे के भीतर कॉल करेगी।"}
          </p>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Business Info & Map (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-bold text-lg text-rose-950 mb-2">
                {lang === "en" ? "Contact Details" : "संपर्क सूत्र"}
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-start space-x-3 text-slate-700 hover:text-rose-900 transition-colors"
                >
                  <div className="p-2 bg-rose-50 rounded-lg text-rose-900 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase leading-none mb-1">
                      {lang === "en" ? "Call" : "फोन नंबर"}
                    </p>
                    <p className="font-sans font-extrabold text-base sm:text-lg">
                      {businessInfo.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-start space-x-3 text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 mt-0.5">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase leading-none mb-1">
                      {lang === "en" ? "WhatsApp chat" : "व्हाट्सएप चैट"}
                    </p>
                    <p className="font-sans font-extrabold text-base sm:text-lg text-emerald-600">
                      +91 {businessInfo.whatsapp.slice(-10)}
                    </p>
                  </div>
                </a>

                {/* Email */}
                {businessInfo.email && (
                  <div className="flex items-start space-x-3 text-slate-700">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-800 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase leading-none mb-1">
                        {lang === "en" ? "Email Address" : "ईमेल आईडी"}
                      </p>
                      <p className="font-sans text-xs sm:text-sm font-medium">
                        {businessInfo.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="flex items-start space-x-3 text-slate-700">
                  <div className="p-2 bg-rose-50 rounded-lg text-rose-900 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase leading-none mb-1">
                      {lang === "en" ? "Academy Address" : "अकादमी का पता"}
                    </p>
                    <p className="font-sans text-xs sm:text-sm font-semibold leading-relaxed">
                      {businessInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            {businessInfo.map_embed_url && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-[240px] shadow-xs relative">
                <iframe
                  title="American Academy Location Purnia"
                  src={businessInfo.map_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}

          </div>

          {/* Right Side: Quick Enquiry Form (7 columns) */}
          <div className="lg:col-span-7" id="enquiry-form-card">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
              
              <h3 className="font-display font-extrabold text-xl text-slate-900 mb-2">
                {lang === "en" ? "Send Admission Enquiry" : "दाखिला पूछताछ फॉर्म"}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                {lang === "en"
                  ? "Fill this simple form and reserve your 2 days free demo batch seats."
                  : "यह साधारण फॉर्म भरें और अपनी 2 दिनों की मुफ्त डेमो क्लास सीट सुरक्षित करें।"}
              </p>

              {/* Form Submission status banners */}
              {success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3 text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <p className="font-bold text-sm">
                      {lang === "en" ? "Enquiry submitted successfully!" : "पूछताछ सफलतापूर्वक सबमिट की गई!"}
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      {lang === "en"
                        ? "Thank you! Shamim Sir's team will contact you shortly on your provided phone number."
                        : "धन्यवाद! शमीम सर की टीम जल्द ही आपके प्रदान किए गए फोन नंबर पर आपसे संपर्क करेगी।"}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3 text-rose-900">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-800" />
                  <div>
                    <p className="font-bold text-sm">
                      {lang === "en" ? "Submission Failed" : "सबमिशन विफल"}
                    </p>
                    <p className="text-xs text-rose-700 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Enquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === "en" ? "Your Full Name" : "आपका पूरा नाम"} <span className="text-rose-800">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "en" ? "e.g. Rahul Kumar" : "जैसे: राहुल कुमार"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === "en" ? "Mobile Phone" : "मोबाइल नंबर"} <span className="text-rose-800">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={lang === "en" ? "10-digit mobile number" : "10-अंकीय मोबाइल नंबर"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Dropdown: Select Course */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {lang === "en" ? "Select Desired Course" : "पसंदीदा कोर्स चुनें"}
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  >
                    <option value="">{lang === "en" ? "-- Choose a Course (Optional) --" : "-- कोई कोर्स चुनें (वैकल्पिक) --"}</option>
                    {courses.map((c, i) => (
                      <option key={i} value={c.name}>
                        {lang === "hi" && c.name_hindi ? c.name_hindi : c.name}
                      </option>
                    ))}
                    <option value="General Inquiry">{lang === "en" ? "Other / General Inquiry" : "अन्य / सामान्य पूछताछ"}</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {lang === "en" ? "Your Message / Query" : "आपका संदेश / प्रश्न"}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={lang === "en" ? "Any questions about batches, timing or discounts?" : "बैच, समय या छूट के बारे में कोई सवाल?"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-900 hover:bg-rose-950 active:scale-98 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{lang === "en" ? "Submitting..." : "सबमिट हो रहा है..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>{lang === "en" ? "Submit Enquiry Now" : "अभी पूछताछ सबमिट करें"}</span>
                    </>
                  )}
                </button>

                {/* Privacy disclaimer */}
                <p className="text-center text-[11px] text-slate-400 font-medium">
                  {lang === "en"
                    ? "🛡️ We respect your privacy. Your phone number is safe and only used for academy admissions."
                    : "🛡️ हम आपकी गोपनीयता का सम्मान करते हैं। आपका नंबर सुरक्षित है और केवल दाखिले के लिए उपयोग किया जाएगा।"}
                </p>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
