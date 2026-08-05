import React, { useState } from 'react';
import { 
  Store, Building2, Clock, Truck, CreditCard, 
  Users, FileText, BellRing, ShieldCheck, Link2
} from 'lucide-react';
import RestaurantProfile from './modules/settings/RestaurantProfile';
import BusinessInfo from './modules/settings/BusinessInfo';
import BusinessHours from './modules/settings/BusinessHours';
import EmptyState from '../ui/EmptyState';

const PlaceholderSetting = ({ title }) => (
  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm h-[60vh]">
    <EmptyState 
      title={`${title} Settings`} 
      description="This configuration module will be deployed in the next phase." 
      icon={Store} 
    />
  </div>
);

const settingTabs = [
  { id: 'profile', label: 'Restaurant Profile', icon: Store, component: RestaurantProfile },
  { id: 'business', label: 'Business Info', icon: Building2, component: BusinessInfo },
  { id: 'hours', label: 'Business Hours', icon: Clock, component: BusinessHours },
  { id: 'delivery', label: 'Delivery Settings', icon: Truck, component: () => <PlaceholderSetting title="Delivery" /> },
  { id: 'payment', label: 'Payment Settings', icon: CreditCard, component: () => <PlaceholderSetting title="Payment" /> },
  { id: 'staff', label: 'Staff Management', icon: Users, component: () => <PlaceholderSetting title="Staff" /> },
  { id: 'documents', label: 'Documents', icon: FileText, component: () => <PlaceholderSetting title="Documents" /> },
  { id: 'notifications', label: 'Notifications', icon: BellRing, component: () => <PlaceholderSetting title="Notifications" /> },
  { id: 'security', label: 'Security', icon: ShieldCheck, component: () => <PlaceholderSetting title="Security" /> },
  { id: 'integrations', label: 'Integrations', icon: Link2, component: () => <PlaceholderSetting title="Integrations" /> },
];

const RestaurantSetting = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = settingTabs.find(t => t.id === activeTab)?.component || RestaurantProfile;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings & Configurations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your restaurant's business profile, operating preferences, and integrations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Vertical Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {settingTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800/50 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full">
          <ActiveComponent />
        </div>

      </div>
    </div>
  );
};

export default RestaurantSetting;