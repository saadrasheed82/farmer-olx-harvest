
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          subcategories:subcategories(*)
        `)
        .order('name');
      
      if (error) throw error;
      return data as (Tables<'categories'> & { 
        subcategories: Tables<'subcategories'>[] 
      })[];
    }
  });
}

export function useSubcategories(categoryId?: string) {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      let query = supabase.from('subcategories').select('*');
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query.order('name');
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId
  });
}
