import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fallbackData } from "./src/data";
import { Enquiry, SheetData } from "./src/types";

// Setup dotenv
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
const ENQUIRIES_FILE = path.join(process.cwd(), "enquiries.json");

app.use(express.json());

// Helper to extract Sheet ID
function extractSheetId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

// Helper to parse Google Sheet visualization json
function parseSheetTab(jsonText: string): any[] {
  const match = jsonText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1]);
    if (!parsed || !parsed.table) return [];
    
    const cols = parsed.table.cols.map((col: any, idx: number) => {
      return col && col.label ? col.label.trim().toLowerCase().replace(/\s+/g, "_") : `col_${idx}`;
    });
    
    return parsed.table.rows.map((row: any) => {
      const item: any = {};
      cols.forEach((colName: string, idx: number) => {
        const cell = row.c[idx];
        item[colName] = cell ? cell.v : "";
      });
      return item;
    });
  } catch (err) {
    console.error("Error parsing sheet tab json:", err);
    return [];
  }
}

// Get live sheet data
async function getLiveSheetData(): Promise<SheetData> {
  const sheetUrl = process.env.GOOGLE_SHEET_URL || "";
  const sheetId = extractSheetId(sheetUrl);
  
  if (!sheetId) {
    console.log("No valid GOOGLE_SHEET_URL found in .env. Using fallback local data.");
    return fallbackData;
  }

  try {
    console.log(`Fetching data from live Google Sheet ID: ${sheetId}`);
    
    // Define tabs to fetch
    const tabs = ["Business_Info", "Courses", "Testimonials", "Gallery", "FAQs", "Videos"];
    const results: any = {};
    
    await Promise.all(
      tabs.map(async (tab) => {
        try {
          const fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}`;
          const res = await fetch(fetchUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          results[tab] = parseSheetTab(text);
        } catch (e) {
          console.error(`Error fetching tab ${tab}:`, e);
          results[tab] = null;
        }
      })
    );

    // Build SheetData response
    const data: SheetData = { ...fallbackData };

    // 1. Process Business Info
    if (results["Business_Info"] && results["Business_Info"].length > 0) {
      const info: any = {};
      results["Business_Info"].forEach((row: any) => {
        // Look for 'key' and 'value' or 'name'/'val' columns
        const key = row.key || row.col_0;
        const val = row.value || row.col_1;
        if (key) {
          info[key.trim()] = val;
        }
      });
      
      if (info.name) {
        data.businessInfo = {
          name: info.name || data.businessInfo.name,
          tagline: info.tagline || data.businessInfo.tagline,
          tagline_hindi: info.tagline_hindi || data.businessInfo.tagline_hindi,
          phone: info.phone || data.businessInfo.phone,
          whatsapp: info.whatsapp || data.businessInfo.whatsapp,
          email: info.email || data.businessInfo.email,
          address: info.address || data.businessInfo.address,
          about_short: info.about_short || data.businessInfo.about_short,
          about_short_hindi: info.about_short_hindi || data.businessInfo.about_short_hindi,
          about_story: info.about_story || data.businessInfo.about_story,
          about_story_hindi: info.about_story_hindi || data.businessInfo.about_story_hindi,
          map_embed_url: info.map_embed_url || data.businessInfo.map_embed_url,
          cta_text: info.cta_text || data.businessInfo.cta_text,
        };
      }
    }

    // 2. Process Courses
    if (results["Courses"] && results["Courses"].length > 0) {
      data.courses = results["Courses"].map((row: any) => ({
        name: row.name || row.course_name || "",
        name_hindi: row.name_hindi || "",
        duration: row.duration || "",
        fee: row.fee || row.price || "",
        timings: row.timings || row.batch_timing || "",
        description: row.description || "",
        description_hindi: row.description_hindi || "",
      })).filter((c) => c.name);
    }

    // 3. Process Testimonials
    if (results["Testimonials"] && results["Testimonials"].length > 0) {
      data.testimonials = results["Testimonials"].map((row: any) => ({
        name: row.name || "",
        name_hindi: row.name_hindi || "",
        role: row.role || row.designation || "",
        role_hindi: row.role_hindi || "",
        content: row.content || row.testimonial || "",
        content_hindi: row.content_hindi || "",
        image_url: row.image_url || row.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      })).filter((t) => t.name && t.content);
    }

    // 4. Process Gallery
    if (results["Gallery"] && results["Gallery"].length > 0) {
      data.gallery = results["Gallery"].map((row: any) => ({
        image_url: row.image_url || row.url || "",
        caption: row.caption || "",
        caption_hindi: row.caption_hindi || "",
        category: row.category || "Classroom"
      })).filter((g) => g.image_url);
    }

    // 5. Process FAQs
    if (results["FAQs"] && results["FAQs"].length > 0) {
      data.faqs = results["FAQs"].map((row: any) => ({
        question: row.question || "",
        question_hindi: row.question_hindi || "",
        answer: row.answer || "",
        answer_hindi: row.answer_hindi || ""
      })).filter((f) => f.question && f.answer);
    }

    // 6. Process Videos
    if (results["Videos"] && results["Videos"].length > 0) {
      data.videos = results["Videos"].map((row: any) => ({
        video_url: row.video_url || row.url || "",
        title: row.title || "",
        description: row.description || "",
        featured: row.featured ? String(row.featured).trim().toLowerCase() : "no"
      })).filter((v) => v.video_url);
    } else {
      data.videos = fallbackData.videos || [];
    }

    return data;
  } catch (err) {
    console.error("Failed to load live Google Sheet data, using local fallback:", err);
    return fallbackData;
  }
}

// Read local enquiries file
function readLocalEnquiries(): Enquiry[] {
  if (!fs.existsSync(ENQUIRIES_FILE)) return [];
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local enquiries file:", err);
    return [];
  }
}

// Write local enquiries file
function writeLocalEnquiries(enquiries: Enquiry[]): void {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local enquiries file:", err);
  }
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Fetch live combined data (sheet + config status)
app.get("/api/data", async (req, res) => {
  const data = await getLiveSheetData();
  res.json({
    data,
    config: {
      hasSheetUrl: !!process.env.GOOGLE_SHEET_URL,
      hasAppsScriptUrl: !!process.env.GOOGLE_APPS_SCRIPT_URL,
      sheetUrl: process.env.GOOGLE_SHEET_URL || "",
      appsScriptUrl: process.env.GOOGLE_APPS_SCRIPT_URL || ""
    }
  });
});

// Submit Enquiry
app.post("/api/enquiries", async (req, res) => {
  const { name, phone, course, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and Phone are required." });
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const id = Math.random().toString(36).substring(2, 11);
  const newEnquiry: Enquiry = { id, timestamp, name, phone, course: course || "General Enquiry", message: message || "" };

  // 1. Save to local storage (failsafe)
  const list = readLocalEnquiries();
  list.unshift(newEnquiry); // newest first
  writeLocalEnquiries(list);

  // 2. Forward to Google Apps Script if URL exists
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  let forwardedToSheet = false;
  let forwardError = "";

  if (appsScriptUrl) {
    try {
      console.log(`Forwarding enquiry to Google Apps Script: ${appsScriptUrl}`);
      const response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnquiry)
      });
      if (response.ok) {
        forwardedToSheet = true;
      } else {
        throw new Error(`Apps Script responded with ${response.status}`);
      }
    } catch (err: any) {
      console.error("Error forwarding enquiry to Sheet:", err);
      forwardError = err.message || "Failed to contact Apps Script Web App";
    }
  }

  res.json({
    success: true,
    enquiry: newEnquiry,
    forwardedToSheet,
    forwardError
  });
});

// Get recent enquiries (secured with password)
app.get("/api/enquiries", (req, res) => {
  const password = req.headers["x-admin-password"] || req.query.password;
  const systemPassword = process.env.ADMIN_PASSWORD || "shamim123";

  if (password !== systemPassword) {
    return res.status(401).json({ error: "Unauthorized. Invalid admin password." });
  }

  res.json(readLocalEnquiries());
});

// Delete an enquiry (secured with password)
app.delete("/api/enquiries/:id", (req, res) => {
  const password = req.headers["x-admin-password"] || req.query.password;
  const systemPassword = process.env.ADMIN_PASSWORD || "shamim123";

  if (password !== systemPassword) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const id = req.params.id;
  const list = readLocalEnquiries();
  const filtered = list.filter((e) => e.id !== id);
  writeLocalEnquiries(filtered);

  res.json({ success: true });
});

// Serve frontend SPA
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode serving static bundle");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
