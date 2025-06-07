
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export function useListings(filters?: {
  categoryId?: string;
  subcategoryId?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      if (filters?.subcategoryId) {
        query = query.eq('subcategory_id', filters.subcategoryId);
      }
      if (filters?.location) {
        query = query.ilike('location_city', `%${filters.location}%`);
      }
      if (filters?.priceMin) {
        query = query.gte('price', filters.priceMin);
      }
      if (filters?.priceMax) {
        query = query.lte('price', filters.priceMax);
      }
      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
}

export function useFeaturedListings() {
  return useListings({ featured: true });
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (listing: TablesInsert<'listings'>) => {
      const { data, error } = await supabase
        .from('listings')
        .insert(listing)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    }
  });
}

export function useUserListings(userId?: string) {
  return useQuery({
    queryKey: ['user-listings', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });
}
