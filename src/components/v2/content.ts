/**
 * Content for the new landing page (v2).
 *
 * Testimonials + FAQ items are the real copy carried over from the legacy
 * landing components. Stats and the network-teaser cards are illustrative
 * placeholders — search for PLACEHOLDER to swap in real figures.
 */

export const APP_URL = "https://app.brokwise.com";
export const REGISTER_URL = "https://app.brokwise.com/get-started";

/** Cal.com booking embed attributes (shared with the legacy hero). */
export const CAL = {
  namespace: "30min",
  link: "anshul-sharma/30min",
  config: '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
} as const;

/** Real headshots in /public/images/people (p1.jpg … p7.jpg). */
export const PEOPLE = [
  "/images/people/p1.jpg",
  "/images/people/p2.jpg",
  "/images/people/p3.jpg",
  "/images/people/p4.jpg",
  "/images/people/p5.jpg",
  "/images/people/p6.jpg",
  "/images/people/p7.jpg",
] as const;

/** Faces shown in the hero social-proof avatar stack. */
export const HERO_AVATARS = PEOPLE.slice(0, 6);

export const HERO_BULLETS = [
  "Aadhaar Verified Brokers Only",
  "15 Days Listing Validation",
  "High-Intent & Active Listings",
  "100% Contact Protection System",
] as const;

/* PLACEHOLDER stats — confirm real figures before launch.
   Icons are the exact glyphs exported from the Figma design. */
export const STATS = [
  { value: "2,450+", label: "Active Requirements", icon: "/icons/stat-active-requirements.svg" },
  { value: "5,800+", label: "Live Inventory", icon: "/icons/stat-live-inventory.svg" },
  { value: "3,200+", label: "Verified Brokers", icon: "/icons/stat-verified-brokers.svg" },
  { value: "40+", label: "Cities Covered", icon: "/icons/stat-cities-covered.svg" },
] as const;

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  location: string;
  content: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AJ",
    name: "Amit Jain",
    role: "Residential Broker",
    location: "Jaipur",
    image: "/images/people/p1.jpg",
    content:
      "Through Brokwise, I started receiving enquiries from areas I never operated in before. Without opening a new branch, my working market expanded.",
  },
  {
    initials: "SY",
    name: "Sandeep Yadav",
    role: "Property Consultant",
    location: "Gurugram",
    image: "/images/people/p4.jpg",
    content:
      "Instead of waiting for leads, I now see active requirements daily. Even if one deal doesn't work out, there are always new opportunities available.",
  },
  {
    initials: "PV",
    name: "Priya Verma",
    role: "Residential Broker",
    location: "Noida",
    image: "/images/people/p6.jpg",
    content:
      "I like that my contact details are not shared automatically. I decide when to share. This gives better control and avoids time-wasters.",
  },
  {
    initials: "MP",
    name: "Mehul Patel",
    role: "Commercial Broker",
    location: "Jaipur",
    image: "/images/people/p2.jpg",
    content:
      "The best part is that only verified brokers are allowed. No fake listings, no unnecessary spam. It feels like a genuine professional network.",
  },
  {
    initials: "RS",
    name: "Rajesh Sharma",
    role: "Plot Consultant",
    location: "Jaipur",
    image: "/images/people/p5.jpg",
    content:
      "Earlier I made 30-40 calls a day to match requirements. On Brokwise, I just post an enquiry and serious brokers send proposals. It saves me a lot of time.",
  },
  {
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Plot Specialist",
    location: "Jaipur",
    image: "/images/people/p7.jpg",
    content:
      "I was earlier dependent only on my local contacts. Now I'm getting access to premium requirements from other verified brokers. My average deal size has improved.",
  },
];

export type Comparison = {
  old: string;
  oldIcon: string;
  brokwise: string;
  newIcon: string;
};

export const COMPARISON: Comparison[] = [
  {
    old: "30-40 cold calls to match one requirement",
    oldIcon: "/icons/cmp-cold-calls.svg",
    brokwise: "Post once, receive proposals from serious brokers",
    newIcon: "/icons/cmp-post-once.svg",
  },
  {
    old: "Stuck within your own locality and contacts",
    oldIcon: "/icons/cmp-stuck.svg",
    brokwise: "Access live demand across 10+ cities",
    newIcon: "/icons/cmp-live-demand.svg",
  },
  {
    old: "Fake, expired, or duplicate listings",
    oldIcon: "/icons/cmp-fake-listings.svg",
    brokwise: "Only KYC-verified brokers and validated inventory",
    newIcon: "/icons/cmp-kyc.svg",
  },
  {
    old: "Your number leaks the moment you share it",
    oldIcon: "/icons/cmp-number-leaks.svg",
    brokwise: "Contact shared only after your approval",
    newIcon: "/icons/cmp-contact.svg",
  },
  {
    old: "Waiting around for the next lead",
    oldIcon: "/icons/cmp-waiting.svg",
    brokwise: "Fresh, high-intent requirements every day",
    newIcon: "/icons/cmp-fresh.svg",
  },
  {
    old: "No idea what's actually working",
    oldIcon: "/icons/cmp-no-idea.svg",
    brokwise: "Clear analytics on deals, proposals, and growth",
    newIcon: "/icons/cmp-analytics.svg",
  },
];

export const STEPS = [
  {
    title: "Get verified",
    body: "Complete KYC and join verified brokers.",
  },
  {
    title: "Post a Requirement",
    body: "Share your buyer requirements or available inventory.",
  },
  {
    title: "Connect & Close",
    body: "Receive proposals, share your contact details and close your deals.",
  },
] as const;

export const CTA_CHECKLIST = [
  "KYC-verified Network",
  "No Hidden Fees",
  "Cancel Anytime",
] as const;

export type Feature = { title: string; body: string; icon: string };

export const FEATURES: Feature[] = [
  {
    icon: "shield-check",
    title: "Inventory Verified Every 15 Days",
    body: "Keeps the enquiries active and genuine.",
  },
  {
    icon: "lock",
    title: "Contact Stays Private",
    body: "Your number is shared only when you approve.",
  },
  {
    icon: "network",
    title: "Closed Broker Network",
    body: "No public leads, no random inquiries.",
  },
  {
    icon: "target",
    title: "Real Broker Requirements",
    body: "Get genuine requirements from active brokers.",
  },
  {
    icon: "cpu",
    title: "Faster Property Matching",
    body: "Match requirements with the right inventory quickly.",
  },
  {
    icon: "trending-up",
    title: "Boost Proposals",
    body: "Push your requirement or listing for better visibility.",
  },
];

export const FAQ_CATEGORIES = [
  "General",
  "Credit & Payment",
  "Subscription",
  "Property",
  "Enquiries",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export type FaqItem = { question: string; answer: string; category: FaqCategory };

/** Curated landing FAQ — real answers grounded in the product. */
export const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "Is Brokwise open to the public, or only brokers?",
    answer:
      "Brokwise is a closed, private network for real estate professionals. There are no public leads and no anonymous browsers — only KYC-verified brokers get in.",
  },
  {
    category: "General",
    question: "How do you keep the network genuine?",
    answer:
      "Every broker completes KYC to join, and we re-validate members every 15 days. Listings are validated too, so you don't waste time on fake, expired, or duplicate inventory.",
  },
  {
    category: "Credit & Payment",
    question: "What do I get for free?",
    answer:
      "New members get 25 free credits on signup to post requirements, send proposals, and connect with verified brokers — at zero cost.",
  },
  {
    category: "Credit & Payment",
    question: "What are credits and how do they work?",
    answer:
      "Credits are the in-app currency for premium actions such as requesting contact details, boosting a proposal, or posting extra requirements. You can top up anytime from Menu → Credits.",
  },
  {
    category: "Subscription",
    question: "Can I cancel anytime?",
    answer:
      "Yes. Plans are flexible with no hidden fees — you can cancel anytime and keep access until the end of your current period.",
  },
  {
    category: "Property",
    question: "How do you keep property listings fresh and genuine?",
    answer:
      "Every listing is validated, and we re-check inventory every 15 days. Expired or duplicate properties are removed, so you only ever see active, genuine inventory.",
  },
  {
    category: "Enquiries",
    question: "Will my contact details be shared automatically?",
    answer:
      "No. Your number is never shared automatically. Contact is shared only after your approval, so you stay in control of every connection.",
  },
];

export const FOOTER_CONTACT = {
  address: [
    "P NO. A-27, Bahubali Nagar, Jaipur",
    "Mansarovar, Jaipur - 302020, Rajasthan, India",
  ],
  phone: "+91 99297 50046",
  phoneHref: "tel:+919929750046",
  email: "support@brokwise.com",
  instagram: "https://www.instagram.com/brokwise/",
} as const;
