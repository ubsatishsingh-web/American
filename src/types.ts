export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  about_short: string;
  about_story: string;
  map_embed_url: string;
  cta_text: string;
  tagline_hindi?: string;
  about_short_hindi?: string;
  about_story_hindi?: string;
}

export interface Course {
  name: string;
  duration: string;
  fee: string;
  timings: string;
  description: string;
  name_hindi?: string;
  description_hindi?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image_url: string;
  name_hindi?: string;
  role_hindi?: string;
  content_hindi?: string;
}

export interface GalleryItem {
  image_url: string;
  caption: string;
  category: string;
  caption_hindi?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  question_hindi?: string;
  answer_hindi?: string;
}

export interface Enquiry {
  id?: string;
  timestamp: string;
  name: string;
  phone: string;
  course: string;
  message: string;
}

export interface SheetData {
  businessInfo: BusinessInfo;
  courses: Course[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  faqs: FAQ[];
}
