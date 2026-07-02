import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Sidebar from '../../components/userDashboard/Sidebar.jsx';
import OverView from '../../components/userDashboard/OverView.jsx';
import Order from '../../components/userDashboard/Order.jsx';
import Wishlist from '../../components/userDashboard/Wishlist.jsx';
import Setting from '../../components/userDashboard/Setting.jsx';

const UserDashboard = () => {

    const [active, setActive] = useState("Overview");


    return (
        <>
            {/* create a sidebar and main content area */}
            <div className='flex h-[90vh]'>
                <div className='w-1/6 border border-base-300'>
                    <Sidebar active={ active } setActive={setActive} />
                </div>
                <div className='w-5/6 h-full border border-green-400 p-4'>
                    {active === "Overview" && <OverView />}
                    {active === "Order" && <Order />}
                    {active === "Wishlist" && <Wishlist />} 
                    {active === "Setting" && <Setting />}
                </div>
            </div>
        </>
    )
}

export default UserDashboard