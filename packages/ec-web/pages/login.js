import React from 'react'
import { useState } from 'react';
import { setCookie } from 'nookies';
import  Router  from 'next/router';
import { useContext } from 'react';
import Head from 'next/head';
import Link from "next/link";
import AuthContext from '../context/AuthContext';
import nookies from 'nookies'
import { getSession, signIn, signOut } from "next-auth/client";
import { takeUsernameFromEmail } from '../utils/format'


const Login = (props) => {

    
    // const signInButtonNode = () => {
    //     if (session) {
    //       return false;
    //     }
    
    //     return (
    //       <div>
    //         <Link href="/api/auth/signin">
    //           <button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               signIn();
    //             }}
    //           >
    //             Sign In
    //           </button>
    //         </Link>
    //       </div>
    //     );
    //   };
    
    //   const signOutButtonNode = () => {
    //     if (!session) {
    //       return false;
    //     }
    
    //     return (
    //       <div>
    //         <Link href="/api/auth/signout">
    //           <button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               signOut();
    //             }}
    //           >
    //             Sign Out
    //           </button>
    //         </Link>
    //       </div>
    //     );
    //   };
    
    //   if (!session) {
    //     return (
    //       <div className="hero">
    //         <div className="navbar">
    //           {signOutButtonNode()}
    //           {signInButtonNode()}
    //         </div>
    //         <div className="text">
    //           You aren't authorized to view this page
    //         </div>
    //       </div>
    //     )
    //   }
    
    //   return (
    //     <div className="hero">
    //       <Head>
    //         <title>Index Page</title>
    //       </Head>
    //       <div className="navbar">
    //         {signOutButtonNode()}
    //         {signInButtonNode()}
    //       </div>
    //       <div className="text">
    //         Hello world
    //       </div>
    //     </div>
    //   );
    // };
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { API_URL } = process.env;
    const { loginUser } = useContext(AuthContext);

    async function handleLogin(ctx) {
        const loginInfo = {
            identifier: identifier,
            password: password
        }

        const login = await fetch(`${API_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        const loginResponse = await login.json();
        
        if(loginResponse.jwt){
            alert('Bạn đã đăng nhập thành công');
            nookies.set(ctx, 'jwt', loginResponse.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            }) 
            nookies.set(ctx, 'user', loginResponse.user._id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            }) 
            
            loginUser()

        }
        else{
            alert('Hãy nhập lại');
        }
    };
    if(props.session) {
        const settingData = async (ctx) => {
            nookies.set(ctx, 'jwt', props.session.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            }) 
            nookies.set(ctx, 'user', props.session.id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            }) 
            const userData = await fetch(`${process.env.API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${props.session.jwt}`
                }
            })
            const user = await userData.json()
            if(!user.profile) {
                //First check if there is a profile in record, if not, created one
                const data = {
                    name: props.session.user.name, 
                    user: user
                }
                const profile = await fetch(`${process.env.API_URL}/profiles`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${props.session.jwt}`
                    },
                    body: JSON.stringify(data)
                })
                const response = await profile.json();
                //Then using the profile just created and link it to the user
                const UpdateUser = await fetch(`${process.env.API_URL}/users/${props.session.id}`,{
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${props.session.jwt}`
                    },
                    body: JSON.stringify({profile: response})
                });
                console.log(UpdateUser);
            }
            return 'End';
        }
        settingData().then(x => console.log(x));
        loginUser();
    }

    return (
        <div className='login-pg'>
            <form id='login-form'>
                <div className='header-box column'>
                    Thông tin đăng nhập
                </div>
                <div className='form-group'>
                    <label className='label' htmlFor='identifier'>Hãy nhập tên người dùng hoặc email của bạn</label>
                    <input className='form-control form__input' name='identifier' type="text" placeholder="Tên người dùng hoặc email của bạn" 
                         id='identifier' required 
                        onChange={e => setIdentifier(e.target.value)} value={identifier}
                    />
                </div>
                <div className='form-group'>
                    <label className='label' htmlFor='password'>Hãy nhập mật khẩu của bạn</label>
                    <input className='form-control form__input' name='password' type="password" placeholder="Mật khẩu"  id='password' required
                        onChange={e => setPassword(e.target.value)} value={password}
                    />
                    
                    
                </div>
                <div className="form-check">
                    <input name='checkbox' className="form-check-input position-static" type="checkbox" id="check" value="Allow" aria-label="..."/>
                    <label htmlFor='checkbox'>Nhớ tài khoản</label>
                </div>
                <button className="center btn block btn-outline-danger" type='button' onClick={() => handleLogin()} >Đăng nhập</button>
                <Link href="/api/auth/signin">
                    <button className='btn block btn-outline-secondary' type='button'  onClick={(e) => { e.preventDefault(); signIn(); }} > Đăng nhập với Goggle</button>
                </Link>
                <div className='forgot'><a href='/forgotPassword'>Quên mật khẩu?</a> Hãy nhấn vào đây để tìm lại mật khẩu ngay nhé!</div>
            </form>
            
            <style jsx>
                {
                    `
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }
                .block{
                    display: block;
                }

                input[type=submit]{
                    display: block;
                    text-align: center;
                }
                #loginr-pg{
                    width: 100%;
                }
                #login-form{
                    width: 80%;
                    margin: 50px auto;
                    color: var(--main-color);
                    background-color: white;
                    border: 1rem solid pink;
                    text-align: center;
                    border-radius: 10px;
                    .header-box.column{
                        font-weight: bold;
                        font-family: 'Playfair Display', sans-serif;
                        font-size: 3rem;
                        display: block;
                        margin-top: 2%;
                        margin-bottom: 2%;
                    }
                    .form__input{
                        display: block;
                        width: 90%;
                        padding: 1rem 0px;

                        margin-left: auto;
                        margin-right: auto;
                    }
                    .btn.block{
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 2%;
                        margin-bottom: 2%;
                    }
                    .form-check{
                        margin-top: 2%;

                        margin-right: auto;
                        margin-left: auto;
                        display: block;
                        width: 30%;

                    }
                    .form-group{
                        .label{
                           text-align: left; 
                            margin: 2%;
                            font-weight: 600;
                        }
                        input{
                            border-radius: 10px;
                        }
                    }
                    .forgot{
                        margin-top: 2%;
                        margin-bottom: 2%;
                        a{
                            color: red;
                        }
                    }
                }

                    
                    `
                }
            </style>

        </div>
    )
    
}

export const getServerSideProps = async({req}) => {
    const session = await getSession({ req });
    return {
        props: {
        session,
        },
    };
} 

export default Login