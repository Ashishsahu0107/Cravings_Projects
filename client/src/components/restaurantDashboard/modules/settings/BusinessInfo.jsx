import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormInput } from '../../../ui/forms/FormInput';
import { FormSelect } from '../../../ui/forms/FormSelect';
import { motion } from 'framer-motion';
import { Save, MapPin } from 'lucide-react';

const businessSchema = z.object({
  legalCompanyName: z.string().min(2, "Company name is required"),
  businessType: z.string().min(1, "Business type is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number").optional().or(z.literal('')),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number").optional().or(z.literal('')),
});

const BusinessInfo = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      legalCompanyName: "Cravings Foods Pvt Ltd",
      businessType: "private_limited",
      ownerName: "John Doe",
      addressLine1: "123 Delivery Street",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
      gstNumber: "29ABCDE1234F1Z5",
      panNumber: "ABCDE1234F"
    }
  });

  const onSubmit = async (data) => {
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
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Business Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your legal entity details, tax information, and primary operating address.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Legal Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-3">Legal Entity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              id="legalCompanyName"
              label="Legal Company Name"
              {...register('legalCompanyName')}
              error={errors.legalCompanyName}
            />
            
            <FormSelect 
              id="businessType"
              label="Business Type"
              options={[
                { value: "proprietorship", label: "Sole Proprietorship" },
                { value: "partnership", label: "Partnership" },
                { value: "private_limited", label: "Private Limited" },
                { value: "public_limited", label: "Public Limited" }
              ]}
              {...register('businessType')}
              error={errors.businessType}
            />

            <FormInput 
              id="ownerName"
              label="Owner/Director Name"
              {...register('ownerName')}
              error={errors.ownerName}
            />
          </div>
        </div>

        {/* Tax Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-3">Tax & Registration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              id="gstNumber"
              label="GST Identification Number (GSTIN)"
              placeholder="e.g. 29ABCDE1234F1Z5"
              {...register('gstNumber')}
              error={errors.gstNumber}
            />
            <FormInput 
              id="panNumber"
              label="PAN Number"
              placeholder="e.g. ABCDE1234F"
              {...register('panNumber')}
              error={errors.panNumber}
            />
          </div>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex justify-between items-end border-b border-gray-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Registered Address</h3>
            <button type="button" className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:text-orange-600 transition">
              <MapPin size={14} /> Detect Location
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput 
                id="addressLine1"
                label="Address Line 1"
                {...register('addressLine1')}
                error={errors.addressLine1}
              />
            </div>
            <div className="md:col-span-2">
              <FormInput 
                id="addressLine2"
                label="Address Line 2 (Optional)"
                {...register('addressLine2')}
                error={errors.addressLine2}
              />
            </div>
            <FormInput 
              id="city"
              label="City"
              {...register('city')}
              error={errors.city}
            />
            <FormInput 
              id="state"
              label="State/Province"
              {...register('state')}
              error={errors.state}
            />
            <FormInput 
              id="postalCode"
              label="Postal/ZIP Code"
              {...register('postalCode')}
              error={errors.postalCode}
            />
            <FormInput 
              id="country"
              label="Country"
              {...register('country')}
              error={errors.country}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <button type="submit" disabled={isSubmitting} className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 shadow-lg shadow-orange-500/30 flex items-center gap-2 border-none">
            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <><Save size={18} /> Save Details</>}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BusinessInfo;
