import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Store, Motorbike, Users, IndianRupee, Megaphone, HeadphonesIcon, FileText, PieChart, Activity, ShieldCheck, Settings, ScrollText, LogOut, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { title: 'Executive Overview', icon: LayoutDashboard, path: '/admin-dashboard/home' },
    { title: 'Orders', icon: ShoppingBag, path: '/admin-dashboard/orders' },
    { title: 'Restaurants', icon: Store, path: '/admin-dashboard/restaurants' },
    { title: 'Riders', icon: Motorbike, path: '/admin-dashboard/riders' },
    { title: 'Customers', icon: Users, path: '/admin-dashboard/customers' },
    { title: 'Finance', icon: IndianRupee, path: '/admin-dashboard/finance' },
    { title: 'Marketing', icon: Megaphone, path: '/admin-dashboard/marketing' },
    { title: 'Support', icon: HeadphonesIcon, path: '/admin-dashboard/support' },
    { title: 'Content', icon: FileText, path: '/admin-dashboard/content' },
    { title: 'Reports', icon: ScrollText, path: '/admin-dashboard/reports' },
    { title: 'Analytics', icon: PieChart, path: '/admin-dashboard/analytics' },
    { title: 'System Monitoring', icon: Activity, path: '/admin-dashboard/system' },
    { title: 'Roles & Permissions', icon: ShieldCheck, path: '/admin-dashboard/roles' },
    { title: 'Settings', icon: Settings, path: '/admin-dashboard/settings' },
    { title: 'Audit Logs', icon: ScrollText, path: '/admin-dashboard/audit' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      {/* Brand */}
      <div className="h-[70px] flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span className="text-orange-500">Super</span>Admin
        </h1>
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-400 hover:text-white transition">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={18} strokeWidth={2.5} />
            {item.title}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-slate-800 z-40 bg-slate-900">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 left-0 bottom-0 w-72 bg-slate-900 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;