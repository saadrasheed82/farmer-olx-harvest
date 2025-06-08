import React, { useState, useEffect } from 'react';
import { Camera, X, MapPin, Scale, Ruler, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCategories, useSubcategories } from '@/hooks/useCategories';
import { useUpdateListing } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '@/hooks/useStorage';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EditListing = () => {
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    priceUnit: 'total' as 'total' | 'per_kg' | 'per_acre' | 'per_unit',
    quantity: '',
    quantityUnit: '' as '' | 'kg' | 'tons' | 'acres' | 'units',
    harvestDate: '',
    organic: 'no' as 'yes' | 'no',
    certification: '' as '' | 'organic' | 'gap' | 'other',
    negotiable: 'no' as const,
    condition: 'new' as 'new' | 'excellent' | 'good' | 'fair' | 'poor',
    locationCity: '',
    locationProvince: '',
    locationAddress: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    deliveryAvailable: 'no' as 'yes' | 'no',
    minOrderQuantity: '',
    paymentTerms: '' as '' | 'advance' | 'partial' | 'delivery' | 'credit'
  });

  const { user } = useAuth();
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories(selectedCategory);
  const updateListing = useUpdateListing();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { uploadImages, uploading } = useStorage();

  // Fetch existing listing data
  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          category:categories(*),
          subcategory:subcategories(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Populate form with existing data
  useEffect(() => {
    if (listing) {
      setSelectedCategory(listing.category_id);
      setSelectedSubcategory(listing.subcategory_id || '');
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price?.toString() || '',
        priceUnit: listing.price_unit || 'total',
        quantity: listing.quantity?.toString() || '',
        quantityUnit: listing.quantity_unit || '',
        harvestDate: listing.harvest_date || '',
        organic: listing.organic || 'no',
        certification: listing.certification || '',
        negotiable: listing.negotiable || 'no',
        condition: listing.condition || 'new',
        locationCity: listing.location_city || '',
        locationProvince: listing.location_province || '',
        locationAddress: listing.location_address || '',
        contactName: listing.contact_name || '',
        contactPhone: listing.contact_phone || '',
        contactEmail: listing.contact_email || '',
        deliveryAvailable: listing.delivery_available || 'no',
        minOrderQuantity: listing.min_order_quantity?.toString() || '',
        paymentTerms: listing.payment_terms || ''
      });
    }
  }, [listing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      
      // Check file types and sizes before adding
      const validFiles = newFiles.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        
        if (!isValidType) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a supported image type. Please use JPEG, PNG, or WebP images.`,
            variant: "destructive"
          });
          return false;
        }
        
        if (!isValidSize) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds the 5MB size limit.`,
            variant: "destructive"
          });
          return false;
        }
        
        return true;
      });

      setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !formData.title || !formData.price || !formData.quantity || !formData.quantityUnit) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (!user || !id) {
        toast({
          title: "Authentication error",
          description: "Please sign in to update your listing.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      // Upload new images if any
      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        try {
          imageUrls = await uploadImages(selectedFiles, user.id);
        } catch (error) {
          toast({
            title: "Error uploading images",
            description: "Failed to upload one or more images. Please try again.",
            variant: "destructive"
          });
          return;
        }
      }

      const listingData = {
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory || null,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        price_unit: formData.priceUnit,
        quantity: parseFloat(formData.quantity),
        quantity_unit: formData.quantityUnit,
        harvest_date: formData.harvestDate || null,
        organic: formData.organic,
        certification: formData.certification || null,
        negotiable: formData.negotiable as 'yes' | 'no',
        condition: formData.condition,
        location_city: formData.locationCity,
        location_province: formData.locationProvince,
        location_address: formData.locationAddress,
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
        contact_email: formData.contactEmail,
        delivery_available: formData.deliveryAvailable,
        min_order_quantity: formData.minOrderQuantity ? parseFloat(formData.minOrderQuantity) : null,
        payment_terms: formData.paymentTerms || null,
        images: imageUrls.length > 0 ? imageUrls : undefined // Only update images if new ones are uploaded
      };

      await updateListing.mutateAsync({ id, data: listingData });

      toast({
        title: "Listing updated!",
        description: "Your listing has been updated successfully."
      });

      navigate('/my-listings');
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        title: "Error updating listing",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 w-1/4 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if the user owns this listing
  if (listing && listing.user_id !== user.id) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
          <p className="text-gray-600 mb-8">You don't have permission to edit this listing.</p>
          <Button onClick={() => navigate('/my-listings')}>
            Back to My Listings
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
            <p className="text-gray-600">Update your listing information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Add up to 10 images of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Existing Images */}
                  {listing?.images?.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* New Images */}
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Upload Button */}
                  {(listing?.images?.length || 0) + selectedFiles.length < 10 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Tell us about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input 
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories?.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Describe your product in detail"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="h-32"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Quantity */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing and Quantity</CardTitle>
                <CardDescription>Set your price and available quantity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rs)
                    </label>
                    <Input 
                      type="number"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => updateFormData('price', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Unit
                    </label>
                    <Select value={formData.priceUnit} onValueChange={(value) => updateFormData('priceUnit', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="total">Total Price</SelectItem>
                        <SelectItem value="per_kg">Per Kg</SelectItem>
                        <SelectItem value="per_acre">Per Acre</SelectItem>
                        <SelectItem value="per_unit">Per Unit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <Input 
                      type="number"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={(e) => updateFormData('quantity', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity Unit
                    </label>
                    <Select value={formData.quantityUnit} onValueChange={(value) => updateFormData('quantityUnit', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="units">Units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Negotiable
                  </label>
                  <Select value={formData.negotiable} onValueChange={(value) => updateFormData('negotiable', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is price negotiable?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Additional information about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <Select value={formData.condition} onValueChange={(value) => updateFormData('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harvest Date
                  </label>
                  <Input 
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => updateFormData('harvestDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organic
                  </label>
                  <Select value={formData.organic} onValueChange={(value) => updateFormData('organic', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is this product organic?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification
                  </label>
                  <Select value={formData.certification} onValueChange={(value) => updateFormData('certification', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select certification (if any)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organic">Organic Certified</SelectItem>
                      <SelectItem value="gap">GAP Certified</SelectItem>
                      <SelectItem value="other">Other Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Where is your product located?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Input 
                      placeholder="Enter city"
                      value={formData.locationCity}
                      onChange={(e) => updateFormData('locationCity', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <Select value={formData.locationProvince} onValueChange={(value) => updateFormData('locationProvince', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Punjab">Punjab</SelectItem>
                        <SelectItem value="Sindh">Sindh</SelectItem>
                        <SelectItem value="KPK">KPK</SelectItem>
                        <SelectItem value="Balochistan">Balochistan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Textarea 
                    placeholder="Enter detailed address"
                    value={formData.locationAddress}
                    onChange={(e) => updateFormData('locationAddress', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can buyers reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input 
                      placeholder="Enter your name"
                      value={formData.contactName}
                      onChange={(e) => updateFormData('contactName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      placeholder="+92 300 1234567"
                      value={formData.contactPhone}
                      onChange={(e) => updateFormData('contactPhone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                type="button"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate('/my-listings')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                disabled={updateListing.isPending || uploading}
              >
                {updateListing.isPending || uploading ? 'Updating...' : 'Update Listing'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditListing; 