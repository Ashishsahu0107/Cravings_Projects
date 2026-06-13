import React from 'react'
import LogoHeader from '../assets/footerLogo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='bg-[var(--bg-footer)] text-center p-9 '>
                <p className='text-center text-white'>
                    --- Your favorite food delivery platform connecting customers with restaurants and riders. ---
                </p>
                <div className='flex justify-around items-center px-9'>
                    <div>
                        <img src={LogoHeader} alt="" className='h-40' />
                    </div>
                    <div className='grid gap-4 text-start text-white'>
                        <h1>Quick Links</h1>
                        <div className='grid'>
                            <Link to='/'>Home</Link>
                            <Link to={"/about"}>About</Link>
                            <Link>Order Now</Link>
                        </div>
                    </div>
                    <div>
                        <h1>For Restaurants</h1>
                        <div>
                            <Link>Partner With Us</Link>
                            <Link>Restaurant Dashboard</Link>
                        </div>
                    </div>
                    <div>
                        <h1>For Riders</h1>
                        <div>
                            <Link>Become a Rider</Link>
                            <Link>Rider Dashboard</Link>
                        </div>
                    </div>
                    <div>
                        <h1>Feedback & Support</h1>
                        <div>
                            <Link>Submit Feedback</Link>
                            <Link>Help Center</Link>
                            <Link>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer