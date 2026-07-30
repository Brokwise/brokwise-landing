export type ProfileType = "COMPANY" | "BROKER" | "PARTNER";
export type Specialization = "BUY" | "SELL" | "RENT";
export type PropertyCategory =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "AGRICULTURAL"
  | "RESORT"
  | "FARM_HOUSE";

export interface ProfileCardData {
  slug: string;
  displayName: string;
  profileType: ProfileType;
  city?: string;
  avatarImage?: string;
  specializations: Specialization[];
  propertyCategories: PropertyCategory[];
  propertyTypes: string[];
  languages: string[];
  heroImage?: string;
  reraVerified: boolean;
  /** Public credential - safe to display. */
  reraNumber?: string;
  /** Count of the owner's ACTIVE listings. Count only, never which ones. */
  activeListings: number;
  yearsOfExperience?: number;
  operatingAreas: string[];
  operatingAreaCount: number;
}

export interface ProfileListResponse {
  profiles: ProfileCardData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AnonymizedCategorySummary {
  category: PropertyCategory;
  count: number;
  propertyTypes: string[];
  bhkRange: { min: number; max: number } | null;
  sizeRange: { min: number; max: number; unit: string } | null;
  priceRange: { min: number; max: number } | null;
}

export interface AreaSummary {
  label: string;
  formattedAddress: string;
  city?: string;
  center?: [number, number]; // [lng, lat]
  radiusKm: number;
  summary: {
    identifiable: boolean;
    totalCount: number;
    categories: AnonymizedCategorySummary[];
  };
}

export interface CompanyBroker {
  brokerId: string;
  fullName: string;
  profilePhoto?: string;
  reraNumber?: string;
  city?: string;
  yearsOfExperience?: number;
  description?: string;
  categories: PropertyCategory[];
}

export interface ProfileDetail {
  slug: string;
  displayName: string;
  profileType: ProfileType;
  about?: string;
  city?: string;
  avatarImage?: string;
  brokers?: CompanyBroker[];
  specializations: Specialization[];
  propertyCategories: PropertyCategory[];
  propertyTypes: string[];
  languages: string[];
  heroImage?: string;
  gallery: string[];
  reraNumber?: string;
  reraVerified: boolean;
  yearsOfExperience?: number;
  areas: AreaSummary[];
}

export const PROFILE_TYPE_LABEL: Record<ProfileType, string> = {
  // A Company account in Brokwise is a Channel Partner (CP).
  COMPANY: "Channel partner",
  BROKER: "Individual broker",
  PARTNER: "Channel partner",
};

export const SPEC_LABEL: Record<Specialization, string> = {
  BUY: "Buy",
  SELL: "Sell",
  RENT: "Rent",
};

export const CATEGORY_LABEL: Record<PropertyCategory, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industrial",
  AGRICULTURAL: "Agricultural",
  RESORT: "Resort",
  FARM_HOUSE: "Farm house",
};
