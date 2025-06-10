import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Search: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          className="w-full pl-10 bg-white/90 text-gray-900"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[200px] bg-white/90 text-gray-900">
          <SelectValue placeholder={t('search.locations.all')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('search.locations.all')}</SelectItem>
          <SelectItem value="punjab">{t('search.locations.punjab')}</SelectItem>
          <SelectItem value="sindh">{t('search.locations.sindh')}</SelectItem>
          <SelectItem value="kpk">{t('search.locations.kpk')}</SelectItem>
          <SelectItem value="balochistan">{t('search.locations.balochistan')}</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="bg-white text-green-700 hover:bg-gray-100">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}; 