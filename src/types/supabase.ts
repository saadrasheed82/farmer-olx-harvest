export interface Profile {
  id: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

export interface Listing {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  location_city: string;
  location_province: string;
  status: 'active' | 'sold' | 'expired' | 'draft';
  category_id: string;
  subcategory_id: string | null;
  user_id: string;
  contact_phone: string | null;
  contact_email: string | null;
  contact_name: string | null;
  images: string[] | null;
  urgent: boolean;
  featured: boolean;
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'poor' | null;
  category?: Category;
  subcategory?: Subcategory;
  user?: Profile;
} 