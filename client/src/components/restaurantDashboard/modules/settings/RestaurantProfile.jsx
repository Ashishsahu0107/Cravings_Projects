import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormInput, FormTextarea } from '../../../ui/forms/FormInput';
import ImageUpload from '../../../ui/forms/ImageUpload';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

const profileSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  cuisineTypes: z.string().min(2, "At least one cuisine is required"),
  tags: z.string(),
  priceRange: z.string().min(1, "Price range is required"),
  businessEmail: z.string().email("Invalid email address"),
  supportEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  phonePrimary: z.string().min(10, "Valid phone number is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal('')),
});

const RestaurantProfile = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      restaurantName: "Cravings Cloud Kitchen",
      description: "Premium delivery-only restaurant serving authentic multi-cuisine dishes.",
      cuisineTypes: "Indian, Chinese, Continental",
      tags: "Fast Food, Healthy, Family",
      priceRange: "$$",
      businessEmail: "hello@cravings.com",
      phonePrimary: "+91 9876543210",
      website: "https://cravings.com"
    }
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    console.log(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Restaurant Profile</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Update your restaurant's public-facing information and brand identity.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Brand Images */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-3">Brand Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ImageUpload 
                id="logo" 
                label="Restaurant Logo" 
                helperText="Square image recommended (1:1)" 
                onChange={() => {}} 
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload 
                id="cover" 
                label="Cover Image" 
                helperText="Widescreen image (16:9) for your store header" 
                onChange={() => {}} 
              />
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-3">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              id="restaurantName"
              label="Restaurant Name"
              placeholder="e.g. The Golden Spoon"
              {...register('restaurantName')}
              error={errors.restaurantName}
            />
            
            <FormInput 
              id="priceRange"
              label="Price Range"
              placeholder="e.g. $, $$, $$$"
              {...register('priceRange')}
              error={errors.priceRange}
            />

            <div className="md:col-span-2">
              <FormTextarea 
                id="description"
                label="Restaurant Description"
                placeholder="Tell customers about your restaurant, history, and specialties..."
                {...register('description')}
                error={errors.description}
              />
            </div>

            <FormInput 
              id="cuisineTypes"
              label="Cuisine Types"
              placeholder="e.g. Italian, Mexican, Indian"
              helperText="Comma separated values"
              {...register('cuisineTypes')}
              error={errors.cuisineTypes}
            />

            <FormInput 
              id="tags"
              label="Search Tags"
              placeholder="e.g. Healthy, Fast Food, Vegan"
              helperText="Helps customers find you in search"
              {...register('tags')}
              error={errors.tags}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-3">Contact Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              id="businessEmail"
              label="Business Email"
              type="email"
              {...register('businessEmail')}
              error={errors.businessEmail}
            />
            <FormInput 
              id="supportEmail"
              label="Support Email (Optional)"
              type="email"
              {...register('supportEmail')}
              error={errors.supportEmail}
            />
            <FormInput 
              id="phonePrimary"
              label="Primary Phone Number"
              {...register('phonePrimary')}
              error={errors.phonePrimary}
            />
            <FormInput 
              id="website"
              label="Website (Optional)"
              {...register('website')}
              error={errors.website}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <button type="button" className="btn btn-outline border-gray-200 dark:border-slate-700 rounded-xl px-6">Discard Changes</button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 shadow-lg shadow-orange-500/30 flex items-center gap-2 border-none"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <><Save size={18} /> Save Profile</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RestaurantProfile;
