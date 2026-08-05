import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="w-full bg-transparent px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <p>© 2026 Cravings Platform. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-orange-500 transition-colors">v2.1.4</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Help & Support</a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
