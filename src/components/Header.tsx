import React from 'react';
import { Search, MapPin, User, Plus, Menu, Heart, MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import SearchSuggestions from './SearchSuggestions';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { searchQuery, setSearchQuery, searchLocation, setSearchLocation, handleSearch } = useSearch();
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch();
    setShowSuggestions(false);
  };

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-green-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Pakistan
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/chat" className="flex items-center hover:text-green-200">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat
            </Link>
            {user ? (
              <>
                <Link to="/settings" className="flex items-center hover:text-green-200">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </Link>
              </>
            ) : (
              <Link to="/login" className="flex items-center hover:text-green-200">
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4 gap-4">
          <Link to="/" className="text-2xl font-bold text-white">
            FarmX
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Find crops, livestock, equipment..."
                className="flex-1 rounded-l-lg border-0 bg-white text-gray-900 placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              <div className="flex items-center px-3 bg-white border-l">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <select 
                  className="border-0 bg-transparent text-gray-700 text-sm"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                >
                  <option value="all">All Pakistan</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">KPK</option>
                  <option value="Balochistan">Balochistan</option>
                </select>
              </div>
              <Button type="submit" className="rounded-l-none bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {showSuggestions && (
              <SearchSuggestions
                query={searchQuery}
                onSelect={handleSuggestionSelect}
              />
            )}
          </form>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/favorites">
              <Button variant="ghost" className="text-white hover:text-green-200">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Plus className="h-4 w-4 mr-2" />
                Sell
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
