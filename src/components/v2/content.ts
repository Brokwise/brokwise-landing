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
  "30 Days Listing Validation",
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
    title: "Inventory Verified Every 30 Days",
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
  "Registration & Verification",
  "Listings & Enquiries",
  "Privacy & Security",
  "Subscription",
  "Broker Directory",
  "Support & Other Info",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export type FaqItem = { question: string; answer: string; category: FaqCategory };

/** Curated landing FAQ - real answers grounded in the product. */
export const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "What is Brokwise?",
    answer:
      "Brokwise is a private B2B platform for real estate brokers, agencies, and firms. It helps verified brokers work together by sharing listings, posting enquiries, and finding co-broker opportunities across India.",
  },
  {
    category: "General",
    question: "Who can join Brokwise?",
    answer:
      "Only genuine real estate brokers, brokerage firms, and agencies can register. Buyers, sellers, tenants, and the general public cannot access the marketplace.",
  },
  {
    category: "General",
    question: "Why should I use Brokwise?",
    answer:
      "Brokwise helps you grow beyond your personal network. You can connect with verified brokers, get more listings and enquiries, and find better collaboration opportunities.",
  },
  {
    category: "General",
    question: "Is Brokwise available across India?",
    answer: "Yes. Brokers from any city in India can join Brokwise.",
  },
  {
    category: "General",
    question: "Is it suitable for individual brokers and agencies?",
    answer:
      "Yes. It is useful for independent brokers, agencies, and brokerage firms.",
  },
  {
    category: "Registration & Verification",
    question: "Why is Aadhaar verification needed?",
    answer:
      "Aadhaar verification helps make sure only genuine brokers join the platform.",
  },
  {
    category: "Registration & Verification",
    question: "Is my Aadhaar information safe?",
    answer:
      "Yes. Your verification is handled securely through authorised verification partners.",
  },
  {
    category: "Registration & Verification",
    question: "How long does account approval take?",
    answer:
      "Most applications are reviewed quickly after verification is completed.",
  },
  {
    category: "Registration & Verification",
    question: "What if verification fails?",
    answer: "You can try again or contact support for help.",
  },
  {
    category: "Registration & Verification",
    question: "Can I register my brokerage firm?",
    answer: "Yes. You can register your brokerage firm on Brokwise.",
  },
  {
    category: "Listings & Enquiries",
    question: "What is a Property Listing?",
    answer:
      "A property listing is a property for sale or rent that you share with verified brokers.",
  },
  {
    category: "Listings & Enquiries",
    question: "What is an Enquiry?",
    answer:
      "An enquiry is a broker's property requirement posted on the marketplace.",
  },
  {
    category: "Listings & Enquiries",
    question: "Can I post unlimited listings?",
    answer: "Posting limits depend on your subscription plan.",
  },
  {
    category: "Listings & Enquiries",
    question: "Can I edit my listings?",
    answer: "Yes. You can update your listings anytime.",
  },
  {
    category: "Listings & Enquiries",
    question: "Why is there a 15-day reminder?",
    answer: "The reminder helps keep listings accurate and up to date.",
  },
  {
    category: "Listings & Enquiries",
    question: "What happens if I do not confirm availability?",
    answer: "The listing becomes inactive until you activate it again.",
  },
  {
    category: "Privacy & Security",
    question: "Will everyone see my phone number?",
    answer:
      "No. Your contact details stay private until you approve sharing them.",
  },
  {
    category: "Privacy & Security",
    question: "How does the Proposal System work?",
    answer:
      "Interested brokers send proposals first, and you decide whether you want to connect.",
  },
  {
    category: "Privacy & Security",
    question: "Why are contact details not public?",
    answer:
      "This helps reduce spam and gives you more control over who contacts you.",
  },
  {
    category: "Privacy & Security",
    question: "Can I report suspicious users?",
    answer: "Yes. You can report any user that looks suspicious.",
  },
  {
    category: "Subscription",
    question: "Is there a free trial?",
    answer:
      "Eligible new members receive a limited-time 3-month Early Bird subscription.",
  },
  {
    category: "Subscription",
    question: "What happens when my subscription expires?",
    answer:
      "Your listings, enquiries, and directory profile become inactive until you renew.",
  },
  {
    category: "Subscription",
    question: "Will I lose my data?",
    answer: "No. Your data is preserved.",
  },
  {
    category: "Subscription",
    question: "Can I upgrade later?",
    answer: "Yes. You can upgrade your plan later.",
  },
  {
    category: "Subscription",
    question: "Which payment methods are accepted?",
    answer: "Secure online payment options are available during checkout.",
  },
  {
    category: "Broker Directory",
    question: "What is the Broker Directory?",
    answer: "The Broker Directory is a public profile directory for subscribers.",
  },
  {
    category: "Broker Directory",
    question: "Is publishing mandatory?",
    answer: "No. Publishing your profile is optional.",
  },
  {
    category: "Broker Directory",
    question: "Will my profile disappear after expiry?",
    answer: "Yes. It will stay inactive until renewal.",
  },
  {
    category: "Support & Other Info",
    question: "How can I get help?",
    answer: "You can contact support by phone, WhatsApp, or email.",
  },
  {
    category: "Support & Other Info",
    question: "Why join now?",
    answer:
      "Joining early helps you start building your network and lets you make use of the limited-time Early Bird offer.",
  },
  {
    category: "Support & Other Info",
    question: "Is there a mobile app?",
    answer: "Right now, Brokwise is available on the web platform.",
  },
  {
    category: "Support & Other Info",
    question: "Can customers post requirements?",
    answer: "No. Only verified brokers can post requirements.",
  },
  {
    category: "Support & Other Info",
    question: "Can I collaborate across states?",
    answer: "Yes. You can collaborate with brokers across India.",
  },
  {
    category: "Support & Other Info",
    question: "How is it different from WhatsApp groups?",
    answer:
      "Brokwise gives you a structured marketplace with search, proposals, and verification, instead of scattered chat messages.",
  },
  {
    category: "Support & Other Info",
    question: "Does Brokwise charge brokerage?",
    answer: "No. Brokwise does not charge brokerage.",
  },
  {
    category: "Support & Other Info",
    question: "How do I know a broker is genuine?",
    answer: "All members complete Aadhaar-based verification.",
  },
  {
    category: "Support & Other Info",
    question: "Can I invite other brokers?",
    answer: "Yes. You can invite other brokers to join Brokwise.",
  },
];

export const FOOTER_CONTACT = {
  address: ["Jaipur, Rajasthan"],
  phone: "+91 92160 88522",
  phoneHref: "tel:+919216088522",
  email: "support@brokwise.com",
  instagram: "https://www.instagram.com/brokwise/",
} as const;
