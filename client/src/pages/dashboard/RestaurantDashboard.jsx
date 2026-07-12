import React from 'react'
import { Outlet } from 'react-router-dom';
import RestaurantSidebar from '../../components/restaurantDashboard/RestaurantSidebar.jsx';

const RestaurantDashboard = () => {
    return (
        <>
            <div className='flex min-h-[90vh]'>
                <div className='w-1/6 border border-base-300'>
                    <RestaurantSidebar />
                </div>
                <div className='w-5/6 h-full border border-base-300 p-4'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default RestaurantDashboard