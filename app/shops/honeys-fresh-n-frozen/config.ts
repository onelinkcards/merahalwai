// Shop Configuration for Honey's Fresh N Frozen
// All shop-specific data lives here

export type ContactPersonLabel = "Honey" | "Money" | "Office"

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string // Full number with country code: 919419141495
  phoneDisplay: string // Formatted for display: 94191 41495
  whatsappE164: string // Same as phoneE164 for WhatsApp
}

export const shopConfig = {
  // Basic Info
  name: "Honey's Fresh N Frozen",
  tagline: "Fresh • Frozen • Hygienic • Trusted Since 1968",
  url: "https://honeymoneyfish.co",
  cardType: "B2C" as const,
  
  // Contact Information
  contact: {
    phones: ["9419141495", "9419110195"],
    email: "honeyfish.jmu@gmail.com",
    address: "Fish Market, Vivekanand Chowk, Jammu, Jammu & Kashmir - 180001",
    mapQuery: "Honey's Fresh N Frozen, Fish Market, Vivekanand Chowk, Jammu",
    storeHours: "Monday - Sunday: 07:00 AM to 06:30 PM",
    officePhone: "9419108405",
  },
  
  // Contact Persons (Honey and Money only for WhatsApp)
  contactPersons: [
    {
      label: "Honey" as ContactPersonLabel,
      phoneE164: "919419141495",
      phoneDisplay: "94191 41495",
      whatsappE164: "919419141495",
    },
    {
      label: "Money" as ContactPersonLabel,
      phoneE164: "919419110195",
      phoneDisplay: "94191 10195",
      whatsappE164: "919419110195",
    },
    {
      label: "Office" as ContactPersonLabel,
      phoneE164: "919419108405",
      phoneDisplay: "94191 08405",
      whatsappE164: "919419108405",
    },
  ] as ContactPerson[],
  
  // WhatsApp Configuration
  whatsapp: {
    defaultPhone: "9419141495",
    defaultMessage: "Hello Honey's Fresh N Frozen, I want to place an order. Please share today's availability and rates.",
    // WhatsApp behavior: on click open modal with only two options Honey and Money
    showSelector: true,
    selectorPersons: ["Honey", "Money"] as ContactPersonLabel[],
  },
  
  // Social Media Links
  social: {
    facebook: "https://www.facebook.com/share/198avg1doq/",
    instagram: "https://www.instagram.com/frozennation.in?igsh=MXF0YmVvenQxY2FkNg==",
    instagramJammu: "https://www.instagram.com/honeymoneyfish_jammu/",
    twitter: "",
    linkedin: "",
  },
  
  // Trust Badges
  trustBadges: [
    "58+ Years in Business",
    "4.7★ Rated on Justdial",
    "Boneless Fish Pioneers in J&K"
  ] as string[],
  
  // Brand Information
  brands: [
    {
      name: "Fresh & Frozen",
      tagline: "Premium Quality",
      logo: "",
    },
    {
      name: "Hygienic Processing",
      tagline: "Top Standards",
      logo: "",
    },
    {
      name: "Doorstep Delivery",
      tagline: "Jammu Wide",
      logo: "",
    },
    {
      name: "Family Legacy",
      tagline: "Since 1968",
      logo: "",
    },
  ],
  
  // About Section (Mera Halwai)
  about: {
    title: "What is Mera Halwai?",
    shortDescription: "Mera Halwai is a curated catering marketplace that connects you with trusted halwais and caterers for every celebration.\n\nFrom weddings and festivals to corporate events and private gatherings — we make discovering and booking the perfect vendor simple, transparent, and stress-free.",
    fullDescription: `When planning a celebration, finding the right caterer shouldn't feel overwhelming. Mera Halwai brings together verified vendors, clear pricing, and customizable packages — all in one place.

Whether you're hosting an intimate family function or a large-scale wedding, our platform helps you explore options, compare offerings, and choose with confidence.

For vendors, Mera Halwai is a growth platform — helping halwais and caterers expand their reach, attract new clients, and manage bookings efficiently.

We're building India's most trusted celebration network — where every event begins with the right partner.`,
  },
  
  // Payment Configuration
  payment: {
    upiId: "honeyashrama@oksbi",
    upiName: "Honey's Fresh N Frozen",
    upiQrImageUrl: "/shops/honeys-fresh-n-frozen/assets/qr/scan.png",
    scannerImage: "/shops/honeys-fresh-n-frozen/assets/qr/scan.png",
    bank: {
      bankName: "Jammu and Kashmir Bank",
      accountNumberMasked: "0045010100002437",
      ifsc: "JAKA0TARGET",
      accountHolder: "HONEY S FRESH N FROZEN PROP SHIVANI MAHAJAN",
      branchName: "CHANDNAGAR JAMMU"
    },
    // Payment page: include Pay via Scanner with download and save scanner image option
    showScanner: true,
    showDownloadQR: true,
  },
  
  // Google Reviews
  google: {
    placeId: "ChIJa7Yhg4-EHjkRrZWiBBo2YRo",
    mapsUrl: "https://www.google.com/maps/place/Honey+Money+Fish+Company+jammu/@32.7262694,74.8593598,17z",
    reviewsUrl: "https://www.google.com/maps/place/Honey+Money+Fish+Company+jammu/@32.7262694,74.8593598,17z/review",
  },
  
  // SEO
  seo: {
    title: "Honey's Fresh N Frozen - Fresh Fish, Chicken & Mutton | Jammu",
    description: "Honey's Fresh N Frozen - Trusted since 1968. Fresh and frozen fish, chicken, mutton, and ready-to-eat products in Jammu. Premium quality, hygienic processing, doorstep delivery. Order now!",
    keywords: "fresh fish jammu, frozen fish jammu, chicken jammu, mutton jammu, fish market jammu, honey fresh frozen, boneless fish jammu, fish delivery jammu",
  },
  
  // Credits
  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },
  
  // Section Toggles (for enabling/disabling sections)
  sections: {
    showAbout: true,
    showMenu: true,
    showServices: true,
    showGallery: true,
    showReviews: true,
    showSocialConnect: true,
    showContactCard: true,
    showFooter: true,
  },
  
  // Assets Paths (relative to public folder)
  assets: {
    logo: "/logo-fish.png",
    gallery: "/shops/honeys-fresh-n-frozen/assets/gallery/",
    qr: "/shops/honeys-fresh-n-frozen/assets/qr/scan.png",
  },
  
  // Catalog (empty for now, can be populated later)
  catalog: [] as Array<{ id: string; title: string; description: string; logo: string; details: string; images: string[] }>,
  
  // Brochures (empty for now)
  brochures: [] as Array<{ href: string; title: string }>,
  
  // Menu data is in menu.ts file in same folder
  // Import: import { menuCategories } from './menu'
}

export type ShopConfig = typeof shopConfig
