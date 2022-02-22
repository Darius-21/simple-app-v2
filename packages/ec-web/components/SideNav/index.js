import React from 'react'
import Link from 'next/link';
import UserProfile from '../../pages/users';

export default function SideNav(props) {
    return (
        <div className='sidenav'>
            <Link href={{
                pathname:'/users/dashboard',
                query: { dashboard: UserProfile.dashboard}
            }}>
            <a className={'nav-row ' + (props.active === 'dashboard' ? 'active' : '')}>
                Bảng Điều Khiển
            </a>
            </Link>
            <Link href={{
                pathname: '/users',
                query: {}
            }}>
            <a className={'nav-row ' + (props.active === 'index' ? 'active' : '')} >
                Thông tin của tôi
            </a>
            </Link>
            <Link href={{
                pathname: '/users/message',
                query: { message: UserProfile.message }
            }}>
            <a className={'nav-row ' + (props.active === 'message' ? 'active' : '')}>
                Tin nhắn
            </a>
            </Link>
            <Link href={{
                pathname:'/users/jobs',
                query:{ jobs: UserProfile.jobs}
            }}>
            <a className={'nav-row ' + (props.active === 'jobs' ? 'active' : '')}>
                Quản lý công việc
            </a>
            </Link>
            <Link href={{
                pathname:'/users/myTransactions',
                query:{}
            }}>
            <a className={'nav-row ' + (props.active === 'jobs' ? 'active' : '')}>
                Đơn hàng của tôi
            </a>
            </Link>

            <style jsx>
                {`
                .sidenav{
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr 1fr;
                    grid-templat-rows: 1fr;
                    width: 100%;
                    height: auto;
                    background-color: #e892b4;
                }
                .nav-row{
                    text-align: center;
                    padding: 10% 0px;
                    font-size: 18px;
                    font-weight: 500;
                    text-decoration: none;
                    color: white;
                }
                .nav-row:hover{
                    background-color: #e17ea9;
                }
                .active.nav-row{
                    color: grey;
                    background-color: #e17ea6;
                }
                `}
            </style>
        </div>
    )
}
