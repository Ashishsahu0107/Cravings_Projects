import React from 'react'
import { Link } from 'react-router-dom';
import LogoHeader from '../assets/headerLogo.png'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    return (
        <>
            <nav className='flex sticky top-0 z-99 justify-between px-12 h-16 items-center bg-(--color-primary) '>
                <Link to={"./"}>
                    <img src={LogoHeader} alt="header-images" className='h-14 '/>
                </Link>
                <div className='text-md flex gap-3'>
                    <Link to='./login' className='px-3 py-1 hover:outline  rounded-md text-white text-decoration-none'>Login</Link>
                    <Link to='/register' className='px-3 py-1 bg-white rounded-md text-(--color-primary) text-decoration-none flex items-center hover:bg-transparent hover:text-white hover:outline '>Register</Link>
                </div>
            </nav>
        </>
    )
}

export default Header