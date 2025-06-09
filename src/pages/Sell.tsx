import React, { useState } from 'react';
import { Camera, X, MapPin, Scale, Ruler, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCategories, useSubcategories } from '@/hooks/useCategories';
import { useCreateListing } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStorage } from '@/hooks/useStorage';

const Sell = () => {
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
  const createListing = useCreateListing();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { uploadImages, uploading } = useStorage();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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
    
    console.log('Form submission started');
    console.log('Form data:', {
      selectedCategory,
      selectedSubcategory,
      formData,
      selectedFiles
    });
    
    if (!selectedCategory || !formData.title || !formData.price || !formData.quantity || !formData.quantityUnit) {
      console.log('Validation failed:', {
        hasCategory: !!selectedCategory,
        hasTitle: !!formData.title,
        hasPrice: !!formData.price,
        hasQuantity: !!formData.quantity,
        hasQuantityUnit: !!formData.quantityUnit
      });
      
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: Category, Title, Price, Quantity, and Quantity Unit",
        variant: "destructive"
      });
      return;
    }

    try {
      if (!user) {
        console.log('No user found');
        toast({
          title: "Authentication error",
          description: "Please sign in to post an ad.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      // Upload images first
      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        console.log('Starting image upload');
        try {
          imageUrls = await uploadImages(selectedFiles, user.id);
          console.log('Images uploaded successfully:', imageUrls);
        } catch (error) {
          console.error('Image upload error:', error);
          toast({
            title: "Error uploading images",
            description: "Failed to upload one or more images. Please try again.",
            variant: "destructive"
          });
          return;
        }
      }

      const listingData = {
        user_id: user.id,
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
        images: imageUrls,
        status: 'active' as const
      };

      console.log('Creating listing with data:', listingData);
      
      await createListing.mutateAsync(listingData);
      console.log('Listing created successfully');

      toast({
        title: "Listing created!",
        description: "Your listing has been posted successfully."
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error creating listing",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Ad</h1>
            <p className="text-gray-600">Sell your agricultural products to farmers across Pakistan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>Choose the category that best describes your item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select main category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedCategory && (
                  <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories?.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Add up to 10 images of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {selectedFiles.length < 10 && (
                      <label className="relative aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <Camera className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedFiles.length}/10 images uploaded • First image will be the cover
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide details about your agricultural product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Input 
                    placeholder="e.g., Fresh Organic Wheat - Premium Quality"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea 
                    placeholder="Describe your product in detail (variety, quality, grade, etc.)"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (PKR) *
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => updateFormData('price', e.target.value)}
                        required
                      />
                      <Select value={formData.priceUnit} onValueChange={(value) => updateFormData('priceUnit', value)}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Per" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="total">Total</SelectItem>
                          <SelectItem value="per_kg">Per Kg</SelectItem>
                          <SelectItem value="per_acre">Per Acre</SelectItem>
                          <SelectItem value="per_unit">Per Unit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => updateFormData('quantity', e.target.value)}
                        required
                      />
                      <Select value={formData.quantityUnit} onValueChange={(value) => updateFormData('quantityUnit', value)}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harvest Date
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => updateFormData('harvestDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organic
                    </label>
                    <Select value={formData.organic} onValueChange={(value) => updateFormData('organic', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="gap">Good Agricultural Practices (GAP)</SelectItem>
                        <SelectItem value="other">Other Certification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <Select value={formData.condition} onValueChange={(value) => updateFormData('condition', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Fresh/New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Available
                    </label>
                    <Select value={formData.deliveryAvailable} onValueChange={(value) => updateFormData('deliveryAvailable', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Order Quantity
                    </label>
                    <Input 
                      placeholder="Enter minimum order quantity"
                      type="number"
                      value={formData.minOrderQuantity}
                      onChange={(e) => updateFormData('minOrderQuantity', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Terms
                  </label>
                  <Select value={formData.paymentTerms} onValueChange={(value) => updateFormData('paymentTerms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="advance">Advance Payment</SelectItem>
                      <SelectItem value="partial">Partial Advance</SelectItem>
                      <SelectItem value="delivery">Payment on Delivery</SelectItem>
                      <SelectItem value="credit">Credit Terms Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Negotiable
                  </label>
                  <Select value={formData.negotiable} onValueChange={(value) => updateFormData('negotiable', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
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
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                disabled={createListing.isPending || uploading}
              >
                {createListing.isPending || uploading ? 'Posting...' : 'Post Your Ad'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
