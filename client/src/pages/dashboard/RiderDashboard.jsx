import React from 'react'
import { Outlet } from 'react-router-dom';
import RiderSidebar from '../../components/riderDashboard/RiderSidebar.jsx';

const RiderDashboard = () => {
    return (
        <>
            <div className='flex min-h-[90vh]'>
                <div className='w-1/6 border border-base-300'>
                    <RiderSidebar />
                </div>
                <div className='w-5/6 h-full border border-base-300 p-4'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default RiderDashboard