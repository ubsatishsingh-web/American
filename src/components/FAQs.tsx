import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ } from "../types";

interface FAQsProps {
  faqs: FAQ[];
  lang: "en" | "hi";
}

export default function FAQs({ faqs, lang }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 bg-white border-b border-rose-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले सवाल"}
          </h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {lang === "en"
              ? "Got questions about fees, timings, or course duration? Find quick answers below."
              : "फीस, समय या कोर्स की अवधि के बारे में सवाल? नीचे त्वरित उत्तर खोजें।"}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionText = lang === "hi" && faq.question_hindi ? faq.question_hindi : faq.question;
            const answerText = lang === "hi" && faq.answer_hindi ? faq.answer_hindi : faq.answer;

            return (
              <div 
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen 
                    ? "border-rose-900/20 bg-rose-50/20 shadow-xs" 
                    : "border-stone-200 bg-white hover:border-rose-900/10 hover:bg-stone-50/50"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                      isOpen ? "text-rose-900" : "text-slate-400"
                    }`} />
                    <span className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {questionText}
                    </span>
                  </div>
                  
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isOpen ? "bg-rose-900 border-transparent text-white" : "border-slate-200 text-slate-500"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-rose-50 ml-8">
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {answerText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Demo Call To Action */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lang === "en" ? "Still have questions?" : "अभी भी कोई सवाल है?"}{" "}
            <a href="#contact" className="text-rose-900 font-bold underline hover:text-rose-950">
              {lang === "en" ? "Send us an enquiry" : "हमें एक संदेश भेजें"}
            </a>{" "}
            {lang === "en" ? "or directly call Shamim Sir." : "या सीधे शमीम सर को कॉल करें।"}
          </p>
        </div>

      </div>
    </section>
  );
}
