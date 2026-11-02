import type { PropertyCategory } from "@/lib/directory/types";

/** The public listing view the API serves (publicListing.logic, "public"). */
export interface PublicListing {
  id: string;
  propertyId?: string;
  region: "IN" | "AE";
  listingPurpose?: "SALE" | "RENT";
  propertyCategory: PropertyCategory;
  propertyType: string;
  propertyTitle?: string;
  totalPrice?: number;
  monthlyRent?: number;
  rate?: number;
  isPriceNegotiable?: boolean;
  size?: number;
  sizeUnit?: string;
  bhk?: number;
  washrooms?: number;
  furnishing?: string;
  facing?: string;
  isVerified?: boolean;
  city: string | null;
  state: string | null;
  images: string[];
  imageCount: number;
  publishedAt: string | null;
}

export interface PublicListingPage {
  properties: PublicListing[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ListingQuery {
  city?: string;
  listingPurpose?: string;
  propertyCategory?: string;
  bhk?: string;
  page?: string;
}
