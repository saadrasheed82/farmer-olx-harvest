
import React, { useState } from 'react';
import { Camera, X, MapPin } from 'lucide-react';
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

const Sell = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    negotiable: 'no',
    condition: '',
    locationCity: '',
    locationProvince: '',
    locationAddress: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const { user } = useAuth();
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories(selectedCategory);
  const createListing = useCreateListing();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !formData.title || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createListing.mutateAsync({
        user_id: user.id,
        category_id: selectedCategory,
        subcategory_id: selectedSubcategory || null,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        negotiable: formData.negotiable as 'yes' | 'no',
        condition: formData.condition as any,
        location_city: formData.locationCity,
        location_province: formData.locationProvince,
        location_address: formData.locationAddress,
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
        contact_email: formData.contactEmail,
        images: selectedImages,
        status: 'active'
      });

      toast({
        title: "Listing created!",
        description: "Your listing has been posted successfully."
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error creating listing",
        description: "Please try again later.",
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

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide details about your item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Input 
                    placeholder="e.g., High Quality Holstein Cattle - 15 Head"
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
                    placeholder="Describe your item in detail"
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
                    <Input 
                      placeholder="Enter price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateFormData('price', e.target.value)}
                      required
                    />
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
                disabled={createListing.isPending}
              >
                {createListing.isPending ? 'Posting...' : 'Post Your Ad'}
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
