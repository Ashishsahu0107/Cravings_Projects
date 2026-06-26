import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPalette } from 'react-icons/fa';
import LogoHeader from '../assets/headerLogo.png'

const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'gourmet', label: 'Gourmet' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'shadcn', label: 'Shadcn' },
    { value: 'slack', label: 'Slack' },
    { value: 'mintlify', label: 'Mintlify' },
]


const Header = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('cravings-theme') || 'light';
        return themeOptions.some((option) => option.value === savedTheme) ? savedTheme : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('cravings-theme', theme);
    }, [theme]);

    return (
        <>
            <nav className='flex sticky top-0 z-99 justify-between px-6 md:px-12 h-16 items-center bg-(--color-primary) gap-4'>
                <Link to={"./"}>
                    <img src={LogoHeader} alt="header-images" className='h-14 '/>
                </Link>
                <div className='flex items-center gap-3'>
                    <label className='flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm text-white'>
                        <FaPalette className='shrink-0' />
                        <span className='hidden sm:inline'>Theme</span>
                        <select
                            value={theme}
                            onChange={(event) => setTheme(event.target.value)}
                            className='bg-transparent outline-none '
                            aria-label='Theme selection'
                        >
                            {themeOptions.map((option) => (
                                <option key={option.value} value={option.value} className='text-primary'>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Link to='./login' className='px-3 py-1 hover:outline  rounded-md text-white text-decoration-none'>Login</Link>
                    <Link to='/register/customer' className='px-3 py-1 bg-white rounded-md text-(--color-primary) text-decoration-none flex items-center hover:bg-transparent hover:text-white hover:outline '>Register</Link>
                </div>
            </nav>
        </>
    )
}

export default Header
