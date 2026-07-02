import React from 'react'
import { FaBorderAll } from "react-icons/fa6";
import { MdOutlineDashboard, MdOutlineFavorite, MdSettingsSuggest } from "react-icons/md";

const MenuItems = [
    { name: "Overview", icon: <MdOutlineDashboard /> },
    { name: "Order", icon: <FaBorderAll /> },
    { name: "Wishlist", icon: <MdOutlineFavorite /> },
    { name: "Setting", icon: <MdSettingsSuggest /> },
]

const Sidebar = ({ active, setActive }) => {

    return (
        <>
            <div>
                <div className='border-b-2 text-center text-primary font-bold border-primary text-2xl p-3'>
                    User Dashboard
                </div>
                <div className='p-2 flex flex-col gap-3 items-center '>
                    {MenuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(item.name)}
                            className={`flex items-center hover:border-primary w-full gap-2 text-xl p-2 rounded-sm border ${active === item.name && "bg-primary text-primary-content"}`}>
                            {item.icon}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar