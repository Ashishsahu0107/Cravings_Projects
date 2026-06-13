import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [resortApp, setResortApp] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accept, setAccept] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("resort : ", resortApp)
        console.log("FullName : ", fullName)
        console.log("Email : ", email)
        console.log("Mobile No : ", mobile)
        console.log("Password : ", password)
        console.log("Confirm Password : ", confirmPassword)
        console.log("Checkbox : ", accept)
    }
    return (
        <>
            <div className='relative h-[90vh] bg-[url("/login-dashboard.png")] bg-yellow-400 grid items-center justify-end bg-cover bg-center md:ps-30 '>
                <div className='absolute right-30'>
                    <div className='bg-white p-10 grid gap-4 rounded-md w-100'>
                        <div>
                            <h1 className='text-4xl text-center font-semibold text-[var(--bg-color)] '>Create Account</h1>
                            <p className='text-center'>Join us as a Customer, Restaurant, or Rider</p>
                        </div>
                        <form onSubmit={handleSubmit} className='grid gap-4'>
                            <div className='grid gap-2'>
                                <span>Register as:</span>
                                <div>
                                    <div className='flex gap-3'>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="resortApp" id="customer" checked={resortApp === 'customer'} value={resortApp} onChange={(e) => setResortApp(e.target.value)}/>
                                            <label htmlFor="costumer">Customer</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="resortApp" id="restaurant" checked={resortApp === 'restorant'} value={resortApp} onChange={(e) => setResortApp(e.target.value)}/>
                                            <label htmlFor="restaurant">Restaurant</label>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="radio" name="resortApp" id="rider" checked={resortApp === 'rider'} value={resortApp} onChange={(e) => setResortApp(e.target.value)}/>
                                            <label htmlFor="rider">Rider</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="text" name='fullName' id='fullName' placeholder='Enter your fullname' value={fullName} onChange={(e) => setFullName(e.target.value)} className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                            <input type="text" name='email' id='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                            <input type="text" name='mobile' id='mobile' placeholder='Enter your mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                            <input type="text" name='password' id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                            <input type="text" name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border border-[var(--bg-color)] focus:outline focus:outline-[var(--bg-color)] p-1 rounded focus:outline-2' />
                            <div className='flex gap-2'>
                                <input type="checkbox" name="accept" id="accept" onClick={(e) => setAccept(e.target.value)} />
                                <label htmlFor="accept">I agree to the <span className='text-[var(--bg-color)] hover:underline '>terms and conditions.</span></label>
                            </div>
                            <button type='submit' className='w-full py-2 rounded-md bg-[var(--bg-color)] text-white text-lg'>Register</button>
                            <p className='text-center '>Already registered? <span onClick={() => navigate("/login")} className='text-[var(--bg-color)] cursor-pointer '>Login here</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register