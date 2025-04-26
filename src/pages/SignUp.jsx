import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/images/logo.png'
import { Mycontext } from '../App'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../authService';
import { setDoc, doc } from 'firebase/firestore';
import {signInWithGoogle } from '../authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [inputIndex, setinputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const context = useContext(Mycontext);
    const navigate = useNavigate();

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
    }, [context])

    const focusInput = (index) => {
        setinputIndex(index);

    }

    const handleSignUp = async(e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log("User:", user);
            if(user){
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: user.email,
                })
            
            console.log("User Resgistred Successfully");
            toast.success("User Resgistred Successfully",{
                position: "top-center",
                autoClose: 2000,
            });
            navigate('/Login');
        }
        }catch(error){
            console.log("Sign Up Error:", error);
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            const user = await signInWithGoogle(); // Google sign-up
            if (user) {
                // Save user info to Firestore if needed
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    // other user details if necessary
                });
                toast.success('User Registered with Google', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                navigate('/Login');
            }
        } catch (error) {
            console.log('Google Sign Up Error:', error);
            toast.error(error.message, {
                position: 'bottom-center',
                autoClose: 2000,
            });
        }
    };
    

    return (
        <section className="loginSection signUpSection">
            <div className="row">
                <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
                    <h1>The Impact of <span className="text-sky">Air Pollution</span> and the <span className='text-sky'>Importance of Preventive Measures.</span></h1>
                    <p>Air pollution in cities like Dhaka poses a severe threat to public health, causing
                        respiratory problems, heart diseases, and reduced quality of life. Vulnerable groups,
                        including children and the elderly, are the most affected, facing long-term health
                        complications. Everyday activities like commuting or outdoor work expose people to
                        harmful pollutants, worsening their condition. Wearing masks is a simple yet
                        effective way to reduce exposure to fine particulate matter (PM2.5) and toxic gases.
                        Masks act as a barrier, protecting lungs and reducing the risk of respiratory illnesses.
                        By raising awareness and promoting preventive measures, we can safeguard lives and build a healthier future.</p>

                  <div className="gotToHome w-100 mt-4">
                   
                   <Link to={'/'}><Button className='btn-blue2 btn-lg'> <IoHome/> Go to home</Button></Link>
                  
                  </div>

                </div>
                <div className="col-md-4">
                    <div className="loginBox signupBox">
                        <div className="logo text-center">
                            <img src={Logo} width="60px" className='mt-3' />
                            <h4 className='font-weight-bold'>Register a new account</h4>
                        </div>

                        <div className="wrapper">
                            <form onSubmit={handleSignUp}>

                                <div className={`from-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                    <span className='icon'><FaUser /></span>
                                    <input type="text" className='from-control' placeholder='Enter your name'
                                        value={name} onChange={(e) => setname(e.target.value)}  
                                        onFocus={() => focusInput(0)} onBlur={() => setinputIndex(null)} autoFocus />
                                </div>
                                <div className={`from-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                    <span className='icon'><MdEmail /></span>
                                    <input type="text" className='from-control' placeholder='Enter your email'
                                        value={email} onChange={(e) => setemail(e.target.value)}    
                                        onFocus={() => focusInput(1)} onBlur={() => setinputIndex(null)} />
                                </div>

                                <div className={`from-group position-relative ${inputIndex === 2 && 'focus'}`}>
                                    <span className='icon'><RiLockPasswordFill /></span>
                                    <input type={`${isShowPassword === true ? 'text' : 'password'}`} className='from-control' placeholder='Enter your password'
                                        value={password} onChange={(e) => setpassword(e.target.value)}      
                                        onFocus={() => focusInput(2)} onBlur={() => setinputIndex(null)} />

                                    <span className="toggleShowPassword" onClick={() =>
                                        setisShowPassword(!isShowPassword)
                                    }>
                                        {
                                            isShowPassword === true ? <IoMdEye /> : <IoMdEyeOff />
                                        }

                                    </span>
                                </div>

                                <div className="from-group ">
                                    <Button type='submit' className="btn-blue btn-lg w-100">Sign Up</Button>
                                </div>

                                <div className="from-group text-center mb-0">
                                    <Link to={'/forgot-password'} className="link">
                                        FORGET PASSWORD
                                    </Link>

                                    <div className='d-flex align-items-center 
                justify-content-center or mt-3 mb-0'>
                                        <span className='line'></span>
                                        <span className='middleText'>or</span>
                                        <span className='line'></span>
                                    </div>

                                    <div className="googleSignIn">
                                        <Button variant='outlined' className='w-100 btn-lg 
          logInWithGoogle' onClick={handleGoogleSignUp}>
                                            <FcGoogle />
                                            Sign Up with Google

                                        </Button>
                                    </div>

                                </div>
                            </form>

                        </div>


                    </div>
                </div>

            </div>



        </section>
    )
}

export default SignUp;

