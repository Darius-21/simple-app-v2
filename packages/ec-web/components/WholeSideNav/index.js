import React from 'react'
import SideNav from '../SideNav'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import HeaderContext from '../../context/HeaderContext';
import Link from 'next/link'
import { setCookie } from 'nookies';
import nookies from 'nookies';
import { getSession, signIn, signOut } from "next-auth/client";

export default function WholeSideNav(props) {
    const router = useRouter();
    const { userId, logoutUser, userProfile } = useContext(AuthContext);
    const userData = userProfile[0];
    var name = '';
        switch(router.pathname){
            case '/users':
                name = 'index';
                break;
            case '/users/dashboard':
                name = 'dashboard';
                break;
            case '/users/message':
                name = 'message';
                break;
            case '/users/jobs':
                name = 'jobs';
                break;
            case '/users/myTransaction':
                name='mytransactions';
            default:
                name = '';
                break;
        }
        async function handleLogout(e, ctx){
            e.preventDefault();
            console.log('Logging out');
            nookies.destroy(ctx, 'jwt', {
              path: '/'
            })
            nookies.destroy(ctx, 'user', {
              path: '/'
            } )
            signOut();
            logoutUser();
            
        }
        return (
            <div className='side-nav'>
                    <div className='ava-name-card'>
                        <div className='ava-box'>
                            <img className='ava' src={userData.avatar ? `${process.env.API_URL}`+ userData.avatar.url : `${process.env.API_URL} + '/uploads/Le_Doan_Thien_Nhan_image_37c5c42ab4.jpg'`}  width='50px' height='50px'></img>
                        </div>
                        <div className='name-tag'>
                            { userData ? userData.name : "Lâm Thành Tín"}
                        </div>
                    </div>
                    <div className='nav'> 
                        <SideNav active={name}></SideNav>
                        <div className='logoutbtn'>
                            <Link href='/api/auth/signout'><button className='btn' type='button' onClick={(e) => handleLogout(e)}>Đăng xuất</button></Link>
                        </div>
                    </div>
                <style jsx>
                    {`
                    .side-nav{
                                width: 95%;
                                height: 100%;
                                position: relative;
                                background-color: #F4F4F4;
                                border: 1px solid #F4F4F4;
                                
                                border-radius: 10px;
                                .ava-name-card{
                                    display: block;
                                    margin: 5% 10%;

                                    .name-tag{
                                        font-size: 1.5rem;
                                        font-weight: 400;
                                        display: inline;
                                    }
                                    img.ava{
                                        display: inline;
                                        border-radius: 50%;
                                        margin: 7% 2%;

                                    }
                                }
                                .nav{
                                    
                                    width: 100%;
                                    margin-top: 20%;
                                    font-weight: 700;
                                    .logoutbtn{
                                        margin-right: auto;
                                        margin-left: auto;
                                        margin-top: 40%;
                                        margin-bottom: 20%;
                                        button{
                                            padding: 5% 5%;
                                            border-raidus: 10px;
                                            background-color: var(--main-color);
                                            color: white;
                                            font-size: 1rem;
                                            font-weight: 700;
                                        }
                                    }
                                }
                            }
                    `}
                </style>
            </div>
        )
}
