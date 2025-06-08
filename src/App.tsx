import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Category from "./pages/Category";
import Sell from "./pages/Sell";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import MyListings from "./pages/MyListings";
import Search from "./pages/Search";
import ListingDetail from "./pages/ListingDetail";
import EditListing from "./pages/EditListing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/edit-listing/:id" element={<EditListing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
