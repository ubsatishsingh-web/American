import React, { useState, useEffect } from "react";
import { Lock, Unlock, Eye, EyeOff, Loader2, Calendar, Phone, BookOpen, MessageSquare, Trash2, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { Enquiry } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  lang: "en" | "hi";
}

export default function AdminPanel({ onClose, lang }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [sheetConfig, setSheetConfig] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedScript, setCopiedScript] = useState(false);

  // Load from local session storage so they don't have to re-enter password on refreshes
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  const handleLogin = async (overridePassword?: string) => {
    const passToUse = overridePassword || password;
    if (!passToUse) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        headers: { "X-Admin-Password": passToUse }
      });

      if (!response.ok) {
        throw new Error("Invalid password. Please try again.");
      }

      const list = await response.json();
      setEnquiries(list);
      setIsLoggedIn(true);
      sessionStorage.setItem("adminPassword", passToUse);

      // Fetch config status as well
      const configRes = await fetch("/api/data");
      if (configRes.ok) {
        const payload = await configRes.json();
        setSheetConfig(payload.config);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to log in.");
      setIsLoggedIn(false);
      sessionStorage.removeItem("adminPassword");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry from the local backup?")) return;

    try {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Password": password }
      });

      if (response.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
      } else {
        throw new Error("Failed to delete.");
      }
    } catch (err: any) {
      alert("Error deleting enquiry: " + err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    sessionStorage.removeItem("adminPassword");
  };

  // Apps Script code template
  const appsScriptCode = `/**
 * Google Apps Script for "American by Shamim Sir" Admission Enquiries.
 * 
 * 1. Open your Google Sheet.
 * 2. Click Extensions -> Apps Script.
 * 3. Delete any default code and paste this script.
 * 4. Create a tab named "Enquiries" in your sheet (if it doesn't exist).
 *    Make columns: Timestamp, Name, Phone, Course, Message.
 * 5. Click Deploy -> New Deployment.
 * 6. Select "Web App" as deployment type.
 * 7. Set:
 *    - Execute as: "Me (your-email)"
 *    - Who has access: "Anyone"  <-- CRITICAL for public forms!
 * 8. Copy the Web App URL and add it to your .env file as:
 *    GOOGLE_APPS_SCRIPT_URL="YOUR_WEB_APP_URL"
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enquiries");
    if (!sheet) {
      // Fallback: create the tab if missing
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Enquiries");
      sheet.appendRow(["Timestamp", "Name", "Phone", "Course", "Message"]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Append the row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      "'" + (data.phone || ""), // Prefix with ' to treat as string/avoid scientific notation
      data.course || "",
      data.message || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-rose-100">
        
        {/* Header bar */}
        <div className="p-6 bg-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-rose-200 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-display font-extrabold text-base sm:text-lg">
                {lang === "en" ? "Academy Admin Dashboard" : "अकादमी एडमिन डैशबोर्ड"}
              </h2>
              <p className="text-[11px] text-rose-200">
                {lang === "en" ? "Manage enquiries & live Google Sheet integration" : "पूछताछ और लाइव गूगल शीट एकीकरण प्रबंधित करें"}
              </p>
            </div>
          </div>

          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg border border-white/10"
            >
              Logout
            </button>
          )}
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* LOGIN STATE */}
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-900 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  {lang === "en" ? "Enter Admin Password" : "एडमिन पासवर्ड दर्ज करें"}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  {lang === "en" 
                    ? "Access recent prospective students and view configurations. (Default password: shamim123)"
                    : "पासवर्ड दर्ज करके प्रवेश करें। (डिफ़ॉल्ट पासवर्ड: shamim123)"
                  }
                </p>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-800 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-800 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900/40 rounded-xl pl-4 pr-12 py-3.5 text-sm font-semibold tracking-wide focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => handleLogin()}
                  disabled={loading}
                  className="w-full py-3.5 bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Unlock className="w-4 h-4 text-white" />}
                  <span>{lang === "en" ? "Unlock Dashboard" : "डैशबोर्ड अनलॉक करें"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* LOGGED IN ACTIVE DASHBOARD STATE */
            <div className="space-y-8">
              
              {/* TOP: Configuration status */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-sm sm:text-base mb-3">
                    {lang === "en" ? "Google Sheet Integration Status" : "गूगल शीट एकीकरण स्थिति"}
                  </h3>
                  
                  <div className="space-y-3 text-xs sm:text-sm">
                    {/* Live Sheet status */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${sheetConfig?.hasSheetUrl ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="font-bold text-slate-700">
                        {sheetConfig?.hasSheetUrl ? (lang === "en" ? "Live Sheet Connected" : "लाइव गूगल शीट कनेक्टेड") : (lang === "en" ? "Using Local Fallback Data" : "लोकल फॉलबैक डेटा का उपयोग")}
                      </span>
                    </div>

                    {/* Apps Script status */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${sheetConfig?.hasAppsScriptUrl ? "bg-emerald-500" : "bg-amber-500"}`} />
                      <span className="font-bold text-slate-700">
                        {sheetConfig?.hasAppsScriptUrl ? (lang === "en" ? "Apps Script Submission Enabled" : "एप्स स्क्रिप्ट सबमिशन सक्षम") : (lang === "en" ? "Apps Script Submission Missing (Using Local Storage Only)" : "एप्स स्क्रिप्ट सबमिशन अनुपलब्ध (केवल लोकल बैकअप)")}
                      </span>
                    </div>

                    {sheetConfig?.sheetUrl && (
                      <p className="text-[11px] text-slate-500 break-all pt-1 bg-white p-2 rounded-lg border border-slate-100">
                        <strong className="text-slate-700">Sheet:</strong> {sheetConfig.sheetUrl}
                      </p>
                    )}
                  </div>
                </div>

                {/* Integration Instruction Accordion */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h4 className="font-sans font-extrabold text-amber-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    {lang === "en" ? "Need to link your Google Sheet?" : "गूगल शीट लिंक करना चाहते हैं?"}
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed mb-3">
                    {lang === "en"
                      ? "Keep your marketing site 100% updated on the free tier. Simply configure your variables in your .env file."
                      : "मुफ्त में अपनी वेबसाइट को 100% अपडेट रखें। बस अपने .env फ़ाइल में वैरिएबल जोड़ें।"}
                  </p>
                  
                  {/* Copy Script CTA */}
                  <button
                    onClick={copyScript}
                    className="flex items-center justify-center space-x-1.5 bg-amber-800/10 hover:bg-amber-800/20 text-amber-900 text-[11px] font-bold py-1.5 px-3 rounded-lg border border-amber-800/20 transition-all duration-150 cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-amber-900" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? "Copied Script!" : "Copy Google Apps Script"}</span>
                  </button>
                </div>
              </div>

              {/* ENQUIRIES LIST VIEW */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="font-display font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-rose-900" />
                    <span>{lang === "en" ? "Recent Admissions Enquiries" : "हालिया दाखिला पूछताछ"}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-rose-50 text-rose-900 rounded-full">
                      {enquiries.length} {lang === "en" ? "total" : "कुल"}
                    </span>
                  </h3>
                  
                  <button 
                    onClick={() => handleLogin()}
                    className="p-2 text-slate-500 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center"
                    title="Refresh list"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <div className="text-center py-12 bg-stone-50 border border-dashed rounded-2xl text-slate-400 space-y-2">
                    <MessageSquare className="w-10 h-10 mx-auto opacity-40 text-slate-500" />
                    <p className="text-sm font-medium">
                      {lang === "en" ? "No enquiries recorded yet." : "अभी तक कोई पूछताछ दर्ज नहीं हुई है।"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lang === "en" ? "Form submissions will appear here instantly." : "फॉर्म सबमिशन तुरंत यहाँ दिखाई देंगे।"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {enquiries.map((e) => (
                      <div 
                        key={e.id}
                        className="bg-white border hover:border-rose-900/10 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start gap-4 transition-all duration-150"
                      >
                        {/* Enquiry main details */}
                        <div className="space-y-3 flex-1">
                          
                          {/* Name & Badge */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h4 className="font-sans font-extrabold text-slate-900 text-base">
                              {e.name}
                            </h4>
                            <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-100 rounded-full flex items-center">
                              <BookOpen className="w-3 h-3 mr-1" />
                              {e.course}
                            </span>
                          </div>

                          {/* Contact Details */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                            <a 
                              href={`tel:${e.phone}`}
                              className="flex items-center text-slate-600 hover:text-rose-900 hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              +91 {e.phone}
                            </a>
                            <span className="flex items-center">
                              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              {e.timestamp}
                            </span>
                          </div>

                          {/* Optional message */}
                          {e.message ? (
                            <p className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                              "{e.message}"
                            </p>
                          ) : (
                            <p className="text-xs italic text-slate-400">No message provided.</p>
                          )}
                        </div>

                        {/* Delete action button */}
                        <button
                          onClick={() => e.id && handleDelete(e.id)}
                          className="p-2 text-slate-400 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete from local backup"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
