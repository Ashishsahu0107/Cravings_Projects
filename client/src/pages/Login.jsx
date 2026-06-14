import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [validateError, setValidateError] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here, e.g., send loginData to the server
        //Validate loginData

        console.log("Login data submitted:", loginData);

        const payload = {
            email: loginData.email.toLowerCase(),
            password: loginData.password,
        };
    };
    return (
        <>
            <div className='h-[90vh] bg-[url("/foodTable.webp")] bg-yellow-400 grid items-center justify-start bg-cover bg-center md:ps-30 '>
                <div className='bg-white p-10 grid gap-8 rounded-md w-100'>
                    <div className='grid gap-3'>
                        <h1 className='text-4xl text-center font-semibold text-[var(--bg-color)] '>Welcome Back</h1>
                        <p className='text-center'>Login to your Cravings account</p>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className='grid mb-4'>
                            <label htmlFor="email" className='mb-2 text-1xl'>Email</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                placeholder='Enter your email'
                                value={loginData.email}
                                onChange={handleChange}
                                className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                        </div>
                        <div className='grid mb-4'>
                            <label htmlFor="password" className='mb-2 text-1xl'>Password</label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                                placeholder='Enter your password'
                                value={loginData.password}
                                onChange={handleChange}
                                className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                        </div>
                        <button type='submit' className='w-full py-2 mb-4 rounded-md bg-[var(--bg-color)] text-white text-lg'>Login</button>
                        <div className='flex items-center justify-center gap-2 mb-2'>
                            <div className='w-17 border' />
                            <p className=''>Don't have an account?</p>
                            <div className='w-17 border' />
                        </div>
                        <p className='text-center '><span onClick={() => navigate("/register")} className='text-[var(--bg-color)] cursor-pointer '>Create an account</span></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;