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
  "Aadhaar-verified brokers only",
  "15-day listing validation",
  "High-intent, active listings",
  "100% contact-protection system",
] as const;

/* PLACEHOLDER stats — confirm real figures before launch. */
export const STATS = [
  { value: "2,400+", label: "Active requirements" },
  { value: "5,800+", label: "Live inventory" },
  { value: "5,000+", label: "Verified brokers" },
  { value: "40+", label: "Cities covered" },
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

export type Comparison = { old: string; brokwise: string };

export const COMPARISON: Comparison[] = [
  {
    old: "30-40 cold calls to match one requirement",
    brokwise: "Post once, receive proposals from serious brokers",
  },
  {
    old: "Stuck within your own locality and contacts",
    brokwise: "Access live demand across 10+ cities",
  },
  {
    old: "Fake, expired, or duplicate listings",
    brokwise: "Only KYC-verified brokers and validated inventory",
  },
  {
    old: "Your number leaks the moment you share it",
    brokwise: "Contact shared only after your approval",
  },
  {
    old: "Waiting around for the next lead",
    brokwise: "Fresh, high-intent requirements every day",
  },
  {
    old: "No idea what's actually working",
    brokwise: "Clear analytics on deals, proposals, and growth",
  },
];

export const STEPS = [
  {
    title: "Get verified",
    body: "Complete KYC and join verified brokers.",
  },
  {
    title: "Post a requirement",
    body: "Share your buyer requirements or available inventory.",
  },
  {
    title: "Connect & close",
    body: "Receive proposals, share your contact details and close your deals.",
  },
] as const;

export const CTA_CHECKLIST = [
  "25 free credits",
  "KYC-verified network",
  "No hidden fees",
  "Cancel anytime",
] as const;

export type Feature = { title: string; body: string; icon: string };

export const FEATURES: Feature[] = [
  {
    icon: "shield-check",
    title: "Re-verified every 15 days",
    body: "KYC isn't a one-time checkbox. We re-validate brokers every 15 days, so the network stays clean and genuine.",
  },
  {
    icon: "lock",
    title: "Contact protection, built in",
    body: "Your number is never shared automatically. No bypassing, no leakage — you control every connection.",
  },
  {
    icon: "network",
    title: "A closed, private network",
    body: "No public leads and no anonymous browsers. Only verified professionals get in.",
  },
  {
    icon: "target",
    title: "High-intent, validated demand",
    body: "Real requirements from brokers actively working a deal — not scraped or recycled listings.",
  },
  {
    icon: "cpu",
    title: "AI matching that saves hours",
    body: "Intelligent matching pairs your inventory with the right requirements instantly.",
  },
  {
    icon: "trending-up",
    title: "Boosted proposals",
    body: "Use credits to get top positioning and win more attention on the requirements that matter.",
  },
];

export type FaqItem = { question: string; answer: string };

/** Curated landing FAQ — real answers grounded in the product. */
export const FAQS: FaqItem[] = [
  {
    question: "Is Brokwise open to the public, or only brokers?",
    answer:
      "Brokwise is a closed, private network for real estate professionals. There are no public leads and no anonymous browsers — only KYC-verified brokers get in.",
  },
  {
    question: "Will my contact details be shared automatically?",
    answer:
      "No. Your number is never shared automatically. Contact is shared only after your approval, so you stay in control of every connection.",
  },
  {
    question: "What do I get for free?",
    answer:
      "New members get 25 free credits on signup to post requirements, send proposals, and connect with verified brokers — at zero cost.",
  },
  {
    question: "How do you keep the network genuine?",
    answer:
      "Every broker completes KYC to join, and we re-validate members every 15 days. Listings are validated too, so you don't waste time on fake, expired, or duplicate inventory.",
  },
  {
    question: "What are credits and how do they work?",
    answer:
      "Credits are the in-app currency for premium actions such as requesting contact details, boosting a proposal, or posting extra requirements. You can top up anytime from Menu → Credits.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Plans are flexible with no hidden fees — you can cancel anytime and keep access until the end of your current period.",
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
