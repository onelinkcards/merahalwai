// Contact Person Type
export type ContactPersonLabel = "Honey" | "Money" | "Office"

export interface ContactPerson {
  label: ContactPersonLabel
  phoneE164: string // Full number with country code: 919419141495
  phoneDisplay: string // Formatted for display: 94191 41495
  whatsappE164: string // Same as phoneE164 for WhatsApp
}

// Use Vercel deployment URL when available so OG/share image loads on your actual domain
const baseUrl =
  typeof process !== "undefined" && process.env?.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://merahalwai.vercel.app"

export const siteConfig = {
  name: "Mera Halwai",
  tagline: "Book caterers, connect instantly, grow your business.",
  url: baseUrl,
  
  contact: {
    phones: ["7300321034"],
    email: "hello@merahalwai.com",
    address: "House number 1034 Mahaveer Nagar 2nd, Kota, Rajasthan 324005",
    mapQuery: "House number 1034 Mahaveer Nagar 2nd Kota Rajasthan 324005",
    storeHours: "Monday - Sunday: 07:00 AM to 06:30 PM",
    officePhone: "7300321034",
  },
  
  // Contact persons for multi-contact flow
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
  
  whatsapp: {
    defaultPhone: "9419141495",
    defaultMessage: "Hello Honey's Fresh N Frozen, I want to place an order. Please share today's availability and rates.",
  },
  
  trustBadges: [
    "58+ Years in Business",
    "4.7★ Rated on Justdial",
    "Boneless Fish Pioneers in J&K"
  ] as string[],
  
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
  
  about: {
    title: "Welcome to Honey's Fresh N Frozen",
    shortDescription: "Established in 1968, Honey's Fresh N Frozen is a trusted family-run business in Jammu offering fresh and frozen fish, chicken, and mutton. Known for hygiene, quality, and innovation, we pioneered boneless fish in the region and continue to serve with the same dedication and care.",
    fullDescription: `Our journey began in 1968 with Sh. Ashok Kumar Mahajan, a visionary entrepreneur who transformed the food culture of Jammu & Kashmir. At a time when many people avoided eating fish due to bones, he introduced boneless fish to the local market — making fish easier, safer, and more enjoyable to eat. This innovation laid the foundation of our business.

In 1986, Sh. Ashok expanded into wholesale fish supply, building a strong reputation for quality, hygiene, and trust. His sons, Honey and Money, joined the business and carried forward his passion for nutritious food and clean processing.

By 2005, we expanded into poultry products and processing, and in 2015, we added mutton products, offering customers a complete range of high-quality non-vegetarian foods.

In 2021, during the second COVID wave, we lost our beloved parents Sh. Ashok Kumar Mahajan and Smt. Rama Mahajan. Their values, discipline, and dedication continue to guide us every day.

Our website HoneyMoneyFish.co is a tribute to them.

Today, we proudly serve fresh and frozen fish, chicken, and mutton, ensuring top hygiene, fair pricing, and doorstep delivery in Jammu.`,
  },
  
  catalog: [
    {
      id: "service-1",
      title: "Service/Product 1",
      description: "Brief description of your first service or product.",
      logo: "",
      details: "This is a demo description for your first service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-2",
      title: "Service/Product 2",
      description: "Brief description of your second service or product.",
      logo: "",
      details: "This is a demo description for your second service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-3",
      title: "Service/Product 3",
      description: "Brief description of your third service or product.",
      logo: "",
      details: "This is a demo description for your third service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
    {
      id: "service-4",
      title: "Service/Product 4",
      description: "Brief description of your fourth service or product.",
      logo: "",
      details: "This is a demo description for your fourth service or product. Replace this with detailed information about what you offer. Explain the benefits, features, and why customers should choose you. Add specific details that make your service unique and valuable.",
      images: [], // Add your product/service images here
    },
  ],
  
  brochures: [] as Array<{ href: string; title: string }>,
  
  social: {
    facebook: "https://www.facebook.com/share/198avg1doq/",
    instagram: "https://www.instagram.com/frozennation.in?igsh=MXF0YmVvenQxY2FkNg==",
    twitter: "https://twitter.com/yourbusiness",
    linkedin: "https://www.linkedin.com/company/yourbusiness",
  },
  
  seo: {
    title: "Mera Halwai OneLink – Smart Digital Card",
    description: "Book caterers, connect instantly, and become a vendor with Mera Halwai OneLink — your all-in-one smart digital card.",
    keywords: "mera halwai, catering, book caterers, become vendor, smart digital card, onelink, event catering, kota",
  },
  
  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },
  
  google: {
    placeId: "ChIJa7Yhg4-EHjkRrZWiBBo2YRo",
    mapsUrl: "https://www.google.com/maps/place/Honey+Money+Fish+Company+jammu/@32.7262694,74.8593598,17z",
    reviewsUrl: "https://www.google.com/maps/place/Honey+Money+Fish+Company+jammu/@32.7262694,74.8593598,17z/review",
  },
}

export type SiteConfig = typeof siteConfig
