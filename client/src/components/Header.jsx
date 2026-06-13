import React from 'react'
import { Link } from 'react-router-dom';
import LogoHeader from '../assets/headerLogo.png'


const Header = () => {
    return (
        <>
            <nav className='flex sticky top-0 z-99 justify-between px-12 h-16 items-center bg-[var(--bg-color)] '>
                <Link to={"./"}>
                    <img src={LogoHeader} alt="header-images" className='h-14 '/>
                </Link>
                <div className='text-md flex gap-3'>
                    <Link to='/login' className='px-3 py-1 hover:outline  rounded-md text-white text-decoration-none'>Login</Link>
                    <Link to='/register' className='px-3 py-1 bg-white rounded-md text-[var(--bg-color)] text-decoration-none flex items-center hover:bg-transparent hover:text-white hover:outline '>Register</Link>
                </div>
            </nav>
        </>
    )
}

export default Header