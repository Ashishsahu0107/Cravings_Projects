import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { IoMdAdd } from "react-icons/io";
import Paneer from '../../assets/footerLogo.png'
import { FiShoppingCart, FiHeart, FiClock, FiUser } from 'react-icons/fi'

const stats = [
  { label: 'Orders', value: 24, icon: <FiShoppingCart size={20} /> },
  { label: 'Favorites', value: 8, icon: <FiHeart size={20} /> },
  { label: 'Pending', value: 3, icon: <FiClock size={20} /> },
  { label: 'Profile Completeness', value: '82%', icon: <FiUser size={20} /> },
]

const recentOrders = [
  { logo: {Paneer}, name: 'Shahi Paneer', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
  { logo: {Paneer}, name: 'Steamed Rice', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
  { logo: {Paneer}, name: 'Steamed Rice', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
  { logo: {Paneer}, name: 'Steamed Rice', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
  { logo: {Paneer}, name: 'Steamed Rice', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
  { logo: {Paneer}, name: 'Steamed Rice', badge: 'veg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', price: 45, add: "Add" },
]

const OverView = () => {
  const { user } = useAuth()

  return (
    <div className='h-full overflow-auto scrollbar-none bg-primary/10 text-primary-content'>
      <div className='flex items-center justify-between mb-4 px-10 py-3'>
        <div className='text-primary'>
          <h2 className='text-2xl font-bold'>Welcome {`${user.fullName}`}</h2>
          <p className='text-sm'>Here is a quick look at your cravings activity.</p>
        </div>
      </div>


      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 p-12'>
        <div className='mb-7 text-3xl text-primary-content font-bold'>
          <h2>Menu</h2>
        </div>
        {
          recentOrders.map((item, idx) => (
            <div key={idx} className='flex justify-between items-center shadow-md px-4 m-6 rounded-sm bg-primary p-6'>
              <div className='flex items-start gap-4'>
                <img src={Paneer} alt="skdjh" className='h-30' />
                <div className='grid gap-2'>
                  <div className='flex gap-4'>
                    <h1 className='font-bold'>{item.name}</h1>
                    <span className='badge'>{item.badge}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className='flex flex-col gap-5 '>
                <span className='text-primary-content text-xl font-bold' >{item.price}</span>
                <button className='btn btn-primary'><IoMdAdd /> {item.add}</button>
              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default OverView