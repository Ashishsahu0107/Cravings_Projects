import React from 'react';
import WelcomeCard from './overviewSections/WelcomeCard';
import StatisticsCards from './overviewSections/StatisticsCards';
import LiveOrderTable from './overviewSections/LiveOrderTable';
import ActivityPanel from './overviewSections/ActivityPanel';
import RevenueAnalytics from './overviewSections/RevenueAnalytics';
import PopularMenu from './overviewSections/PopularMenu';
import InventoryStatus from './overviewSections/InventoryStatus';
import InsightsAndReviews from './overviewSections/InsightsAndReviews';
import PromotionsAndWallet from './overviewSections/PromotionsAndWallet';

const RestaurantOverView = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <WelcomeCard restaurantName="Pizza Palace" />
      
      <StatisticsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveOrderTable />
        </div>
        <div className="lg:col-span-1">
          <ActivityPanel />
        </div>
      </div>
      
      <RevenueAnalytics />
      
      <PopularMenu />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <InventoryStatus />
        </div>
        <div className="lg:col-span-1">
          <InsightsAndReviews />
        </div>
        <div className="lg:col-span-1 md:col-span-2 lg:col-span-1">
          <PromotionsAndWallet />
        </div>
      </div>
    </div>
  );
};

export default RestaurantOverView;
